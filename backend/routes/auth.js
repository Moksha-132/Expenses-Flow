const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { SECRET_KEY } = require('../middleware/auth');

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ? OR email = ?`, [username, username], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        
        const validPass = bcrypt.compareSync(password, user.password);
        if (!validPass) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role, company_name: user.company_name }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, role: user.role, username: user.username, company_name: user.company_name });
    });
});

router.post('/register', (req, res) => {
    const { username, email, password, role, company_name } = req.body;
    if (!username || !email || !password || !role) return res.status(400).json({ error: 'Missing fields' });
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    db.run(`INSERT INTO users (username, email, password, role, company_name) VALUES (?, ?, ?, ?, ?)`, [username, email, hashedPassword, role, company_name], function(err) {
        if (err) return res.status(400).json({ error: 'Username or email already exists' });
        
        const token = jwt.sign({ id: this.lastID, username, role, email, company_name }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, role, username, email, company_name });
    });
});

module.exports = router;
