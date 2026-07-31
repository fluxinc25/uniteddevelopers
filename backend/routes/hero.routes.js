const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const { auth, adminOnly } = require('../middleware/auth');

// Get hero content (public)
router.get('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({});
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update hero (admin)
router.put('/', auth, adminOnly, async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create(req.body);
    } else {
      hero = await Hero.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;