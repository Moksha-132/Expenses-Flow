const express = require('express');
const { sendMail } = require('../utils/mailer');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailSent = await sendMail(
        process.env.EMAIL_USER, 
        `New Contact Request: ${subject || 'No Subject'}`, 
        `You have received a new contact request.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    if (emailSent) {
        res.json({ success: true, message: 'Message sent successfully!' });
    } else {
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

module.exports = router;
