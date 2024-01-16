const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid credentials');
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

// Update User Route
router.put('/user/update', async (req, res) => {
    try {
    // Check if the authorization header is set
    if (!req.headers.authorization) {
        return res.status(401).send('Authorization header is missing');
      }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send('No token provided');
    }
      
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send('Invalid token');
    }
  
    // Find user by ID from token and update
    const updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        { $set: { profileInfo: req.body.profileInfo } },
        { new: true }
      );
      
      // Exclude password from the response
      updatedUser.password = undefined;
  
      res.json(updatedUser);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
          res.status(401).send('Invalid token');
        } else {
          res.status(500).send(error.message);
        }
      }
    });

module.exports = router;
