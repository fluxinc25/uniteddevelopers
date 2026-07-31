const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  headline: { type: String, default: 'Building Digital Experiences That Matter' },
  subtitle: { type: String, default: 'Full Stack Developer & Android Specialist' },
  description: { type: String, default: 'I craft premium websites and powerful Android applications using modern technologies and AI-powered workflows.' },
  ctaPrimary: {
    text: { type: String, default: 'View My Work' },
    link: { type: String, default: '/projects' }
  },
  ctaSecondary: {
    text: { type: String, default: 'Contact Me' },
    link: { type: String, default: '/contact' }
  },
  profileImage: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    whatsapp: { type: String, default: '' }
  },
  stats: [{
    label: { type: String },
    value: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);