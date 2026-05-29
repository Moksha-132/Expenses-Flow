const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

const { sendMail } = require('../utils/mailer');

router.post('/', authenticateToken, upload.single('receipt'), (req, res) => {
    const { expense_category, amount, date_time, reference_number, notes } = req.body;
    const receipt_url = req.file ? `/uploads/${req.file.filename}` : null;
    
    if (req.user.role !== 'employee') return res.status(403).json({ error: 'Only employees can add expenses' });

    db.run(
        `INSERT INTO expenses (user_id, expense_category, amount, date_time, reference_number, notes, receipt_url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [req.user.id, expense_category, amount, date_time, reference_number, notes, receipt_url],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            const expenseId = this.lastID;
            
            // Send email to all managers in the same company
            db.all(`SELECT email FROM users WHERE role = 'manager' AND company_name = ?`, [req.user.company_name], (err, managers) => {
                if (!err && managers) {
                    managers.forEach(mgr => {
                        if (mgr.email) {
                            sendMail(mgr.email, `New Expense Submitted by ${req.user.username}`, `A new expense of $${amount} for ${expense_category} has been submitted by ${req.user.username} and is awaiting your approval.`);
                        }
                    });
                }
            });

            res.json({ id: expenseId, user_id: req.user.id, expense_category, amount, date_time, reference_number, notes, status: 'Pending', receipt_url });
        }
    );
});

router.get('/', authenticateToken, (req, res) => {
    if (req.user.role === 'employee') {
        db.all(`SELECT * FROM expenses WHERE user_id = ? ORDER BY created_at DESC`, [req.user.id], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } else if (req.user.role === 'manager') {
        db.all(`SELECT expenses.*, users.username FROM expenses JOIN users ON expenses.user_id = users.id WHERE users.company_name = ? ORDER BY expenses.created_at DESC`, [req.user.company_name], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
});

router.patch('/:id/status', authenticateToken, (req, res) => {
    const { status } = req.body;
    if (req.user.role !== 'manager') return res.status(403).json({ error: 'Only managers can update status' });

    const validStatuses = ['Approved', 'Rejected', 'Paid'];
    if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });

    db.run(
        `UPDATE expenses SET status = ? WHERE id = ?`,
        [status, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            
            // Notify employee
            db.get(`SELECT u.email, u.username, e.expense_category, e.amount FROM expenses e JOIN users u ON e.user_id = u.id WHERE e.id = ?`, [req.params.id], (err, row) => {
                if (!err && row && row.email) {
                    sendMail(row.email, `Expense Status Updated: ${status}`, `Hello ${row.username},\n\nYour expense of $${row.amount} for ${row.expense_category} has been marked as ${status} by a manager.`);
                }
            });

            res.json({ success: true, changes: this.changes });
        }
    );
});

module.exports = router;
