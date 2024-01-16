const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      profileInfo: {
        name: req.body.profileInfo?.name,
        age: req.body.profileInfo?.age,
        photo: req.body.profileInfo?.photo
      }
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the created user (excluding the password)
    res.status(201).json({
      username: savedUser.username,
      email: savedUser.email,
      profileInfo: savedUser.profileInfo
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
