const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete any existing admin with this email (fixes plain-text password issue)
    await User.deleteOne({ email: 'admin@uniteddevelopers.com' });
    console.log('🗑️ Cleared old admin (if existed)');

    // Create new admin — Mongoose pre-save hook will hash the password
    const admin = new User({
      name: 'Admin',
      email: 'admin@uniteddevelopers.com',
      password: 'youradminpassword', // Will be auto-hashed by User model
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('   Email: admin@uniteddevelopers.com');
    console.log('   Password: youradminpassword');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

createAdmin();