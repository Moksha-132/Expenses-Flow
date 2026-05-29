const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { sendMail } = require('../utils/mailer');

const router = express.Router();

router.post('/request', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: 'No account found with this email' });
        const token = crypto.randomBytes(3).toString('hex').toUpperCase();
        db.run(`INSERT INTO password_resets (email, token) VALUES (?, ?)`, [email, token], async (err) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            const emailSent = await sendMail(
                email,
                'Password Reset Code - ExpenseFlow',
                `Your password reset code is: ${token}\n\nIf you did not request a password reset, please ignore this email.`
            );

            if (emailSent) {
                res.json({ message: 'Reset code sent to email' });
            } else {
                res.status(500).json({ error: 'Failed to send email' });
            }
        });
    });
});

router.post('/confirm', (req, res) => {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) return res.status(400).json({ error: 'Missing fields' });

    db.get(`SELECT * FROM password_resets WHERE email = ? AND token = ? ORDER BY created_at DESC LIMIT 1`, [email, token], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(400).json({ error: 'Invalid or expired reset code' });

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        db.run(`UPDATE users SET password = ? WHERE email = ?`, [hashedPassword, email], (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update password' });
            db.run(`DELETE FROM password_resets WHERE email = ?`, [email]);         
            res.json({ message: 'Password updated successfully' });
        });
    });
});

module.exports = router;
