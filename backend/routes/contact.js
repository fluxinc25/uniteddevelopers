const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"United Developers" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📩 New Contact: ${subject}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e5e5;border-radius:16px;background:#fafafa;">
          <h2 style="color:#171717;margin-bottom:16px;">New Message from Your Portfolio</h2>
          <p style="margin:8px 0;"><strong style="color:#525252;">Name:</strong> ${name}</p>
          <p style="margin:8px 0;"><strong style="color:#525252;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin:8px 0;"><strong style="color:#525252;">Subject:</strong> ${subject}</p>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;">
          <p style="margin:8px 0;color:#525252;"><strong>Message:</strong></p>
          <p style="background:white;padding:16px;border-radius:12px;border:1px solid #e5e5e5;color:#171717;line-height:1.6;">${message.replace(/\n/g, '<br/>')}</p>
          <p style="margin-top:24px;font-size:12px;color:#a3a3a3;">Sent from United Developers Portfolio</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send message. Server error.' });
  }
});

module.exports = router;