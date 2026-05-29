const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./expenses.sqlite', (err) => {
    if (err) console.error('Database connection error:', err);
    else {
        console.log('Connected to SQLite database.');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                email TEXT,
                password TEXT,
                role TEXT
            )`, () => {
                // Ensure email column exists if table was already created
                db.run(`ALTER TABLE users ADD COLUMN email TEXT`, (err) => {
                    // Ignore error if column already exists
                });
            });

            db.run(`CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                expense_category TEXT,
                amount REAL,
                date_time TEXT,
                reference_number TEXT,
                notes TEXT,
                status TEXT DEFAULT 'Pending',
                receipt_url TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS password_resets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT,
                token TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            const salt = bcrypt.genSaltSync(10);
            const empPassword = bcrypt.hashSync('emp123', salt);
            const mgrPassword = bcrypt.hashSync('mgr123', salt);
            
            db.get("SELECT count(*) as count FROM users", [], (err, row) => {
                if (row && row.count === 0) {
                    db.run(`INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`, ['employee', 'employee@example.com', empPassword, 'employee']);
                    db.run(`INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`, ['manager', 'manager@example.com', mgrPassword, 'manager']);
                }
            });
        });
    }
});

module.exports = db;
