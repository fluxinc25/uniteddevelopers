const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String },
  image: { type: String, default: '' },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);