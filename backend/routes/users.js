const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.get('/profile', auth, async (req, res) => {
  try {
    const { password: _, ...userWithoutPassword } = req.user;
    res.json({
      ...userWithoutPassword,
      subscription: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put(
  '/profile',
  auth,
  [
    body('firstName').optional().not().isEmpty().trim(),
    body('lastName').optional().not().isEmpty().trim(),
    body('charityPercentage').optional().isInt({ min: 10, max: 100 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstName, lastName, phone, charityId, charityPercentage } = req.body;
      const userIndex = db.mockData.users.findIndex(u => u.id === req.user.id);
      
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (firstName) db.mockData.users[userIndex].first_name = firstName;
      if (lastName) db.mockData.users[userIndex].last_name = lastName;
      if (phone !== undefined) db.mockData.users[userIndex].phone = phone;
      if (charityId !== undefined) db.mockData.users[userIndex].charity_id = charityId;
      if (charityPercentage) db.mockData.users[userIndex].charity_percentage = charityPercentage;

      const { password: _, ...updatedUser } = db.mockData.users[userIndex];

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
