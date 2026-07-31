const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['frontend', 'backend', 'android', 'database', 'tools', 'design', 'ai'] 
  },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String, default: '' },
  color: { type: String, default: '#c9a962' },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Skill', skillSchema);