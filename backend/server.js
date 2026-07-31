const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ─── TRUST PROXY (REQUIRED FOR RENDER) ───
app.set('trust proxy', 1);

// ─── CORS ───
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Connect to MongoDB ───
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Error:', err.message);
    process.exit(1);
  }
};
connectDB();

// ─── RATE LIMITER: Contact form ───
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, // Increased for testing, set back to 3 later
  message: { message: 'Too many messages sent. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false }  // ← FIXES THE CRASH
});
app.use('/api/messages', contactLimiter);

// ─── Routes ───
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/skills', require('./routes/skill.routes'));
app.use('/api/experiences', require('./routes/experience.routes'));
app.use('/api/testimonials', require('./routes/testimonial.routes'));
app.use('/api/messages', require('./routes/message.routes'));
app.use('/api/hero', require('./routes/hero.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

// ─── Health check ───
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'UnitedDevelopers API is running', status: 'OK' });
});

// ─── Start Server ───
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});