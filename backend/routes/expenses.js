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

router.post('/', authenticateToken, upload.single('receipt'), (req, res) => {
    const { expense_category, amount, date_time, reference_number, notes } = req.body;
    const receipt_url = req.file ? `/uploads/${req.file.filename}` : null;
    
    if (req.user.role !== 'employee') return res.status(403).json({ error: 'Only employees can add expenses' });

    db.run(
        `INSERT INTO expenses (user_id, expense_category, amount, date_time, reference_number, notes, receipt_url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [req.user.id, expense_category, amount, date_time, reference_number, notes, receipt_url],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, user_id: req.user.id, expense_category, amount, date_time, reference_number, notes, status: 'Pending', receipt_url });
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
        db.all(`SELECT expenses.*, users.username FROM expenses JOIN users ON expenses.user_id = users.id ORDER BY expenses.created_at DESC`, [], (err, rows) => {
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
            res.json({ success: true, changes: this.changes });
        }
    );
});

module.exports = router;
