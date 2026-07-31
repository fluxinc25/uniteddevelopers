const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  source: { 
    type: String, 
    enum: ['contact', 'hire', 'collaboration'],
    default: 'contact'
  },
  read: { type: Boolean, default: false },
  replied: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);