const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Message = require('../models/Message');
const { auth, adminOnly } = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, source, website } = req.body;

    // HONEYPOT: Only reject if it has actual content
    if (website && website.trim().length > 0) {
      console.log('🤖 Bot detected! Honeypot filled with:', website);
      return res.status(400).json({ message: 'Spam detected' });
    }

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('📨 Form submitted by:', name, '| honeypot value:', JSON.stringify(website));

    // 1. Save to MongoDB
    const msg = new Message({ name, email, subject, message, source });
    await msg.save();

    // 2. Check env vars
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Missing EMAIL_USER or EMAIL_PASS in .env');
      return res.status(500).json({ message: 'Server email config missing' });
    }

    // 3. Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    const info = await transporter.sendMail({
      from: `"${name} (Portfolio Contact)" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📩 New Contact: ${subject}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e5e5;border-radius:16px;background:#fafafa;">
          <h2 style="color:#171717;">New Message from Your Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;">
          <p><strong>Message:</strong></p>
          <p style="background:white;padding:16px;border-radius:12px;border:1px solid #e5e5e5;">${message.replace(/\n/g, '<br/>')}</p>
          <p style="margin-top:24px;font-size:12px;color:#a3a3a3;">📧 Reply to this email to respond directly to ${name}</p>
        </div>
      `,
    });

    console.log('✅ Email sent! ID:', info.messageId);
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ message: 'Failed to send message. Server error.' });
  }
});

router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/read', auth, adminOnly, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/unread', auth, adminOnly, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: false }, { new: true });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/replied', auth, adminOnly, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { replied: true }, { new: true });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;