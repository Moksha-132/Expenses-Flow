const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

console.log('Connecting to PostgreSQL database...');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const initPg = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT UNIQUE,
            email TEXT,
            password TEXT,
            role TEXT,
            company_name TEXT
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS expenses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            expense_category TEXT,
            amount REAL,
            date_time TEXT,
            reference_number TEXT,
            notes TEXT,
            status TEXT DEFAULT 'Pending',
            receipt_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS password_resets (
            id SERIAL PRIMARY KEY,
            email TEXT,
            token TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        const checkColumn = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='users' AND column_name='company_name'
        `);
        if (checkColumn.rowCount === 0) {
            await pool.query(`ALTER TABLE users ADD COLUMN company_name TEXT`);
            console.log('Added company_name column to users table.');
        }

        const salt = bcrypt.genSaltSync(10);
        const empPassword = bcrypt.hashSync('emp123', salt);
        const mgrPassword = bcrypt.hashSync('mgr123', salt);
        
        const res = await pool.query("SELECT count(*) as count FROM users");
        if (res.rows[0].count == 0) {
            await pool.query(`INSERT INTO users (username, email, password, role, company_name) VALUES ($1, $2, $3, $4, $5)`, ['employee', 'employee@example.com', empPassword, 'employee', 'Acme Corp']);
            await pool.query(`INSERT INTO users (username, email, password, role, company_name) VALUES ($1, $2, $3, $4, $5)`, ['manager', 'manager@example.com', mgrPassword, 'manager', 'Acme Corp']);
        }
        console.log('PostgreSQL database initialized successfully.');
    } catch (err) {
        console.error('Database initialization error:', err);
    }
};

initPg();

// Shim to provide seamless compatibility with existing SQLite queries
const db = {
    get: (sql, params, callback) => {
        let i = 1;
        const pgSql = sql.replace(/\?/g, () => `$${i++}`);
        pool.query(pgSql, params, (err, res) => {
            if (err) return callback(err);
            callback(null, res.rows[0]);
        });
    },
    all: (sql, params, callback) => {
        let i = 1;
        const pgSql = sql.replace(/\?/g, () => `$${i++}`);
        pool.query(pgSql, params, (err, res) => {
            if (err) return callback(err);
            callback(null, res.rows);
        });
    },
    run: function(sql, params = [], callback) {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        let i = 1;
        let pgSql = sql.replace(/\?/g, () => `$${i++}`);
        
        let isInsert = pgSql.trim().toUpperCase().startsWith('INSERT');
        if (isInsert && !pgSql.toUpperCase().includes('RETURNING ID')) {
            pgSql += ' RETURNING id';
        }
        
        pool.query(pgSql, params, (err, res) => {
            if (err) {
                if (callback) callback.call(this, err);
                return;
            }
            if (callback) {
                const context = {
                    lastID: isInsert && res.rows.length ? res.rows[0].id : null,
                    changes: res.rowCount
                };
                callback.call(context, null);
            }
        });
    }
};

module.exports = db;
