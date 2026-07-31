const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['website', 'android', 'uiux', 'fullstack', 'ecommerce', 'dashboard'] 
  },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  features: [{ type: String }],
  techStack: [{ type: String }],
  images: [{ type: String }],
  thumbnail: { type: String, required: true },
  liveUrl: { type: String },
  githubUrl: { type: String },
  playStoreUrl: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['active', 'coming-soon', 'archived'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);