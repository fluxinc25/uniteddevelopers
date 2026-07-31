const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { auth, adminOnly } = require('../middleware/auth');

// Get all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create testimonial (admin)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const t = new Testimonial(req.body);
    await t.save();
    res.status(201).json(t);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update testimonial (admin)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(t);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete testimonial (admin)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;