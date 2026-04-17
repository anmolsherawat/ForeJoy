const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').not().isEmpty().trim(),
    body('lastName').not().isEmpty().trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, firstName, lastName, charityId, charityPercentage } = req.body;

      const existingUser = db.mockData.users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const crypto = require('crypto');
      const newUser = {
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        charity_id: charityId || null,
        charity_percentage: charityPercentage || 10,
        is_admin: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      db.mockData.users.push(newUser);

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || 'fallback-secret-key', {
        expiresIn: '30d'
      });

      db.sessions[token] = newUser;

      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = db.mockData.users.find(u => u.email === email);

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'fallback-secret-key', {
        expiresIn: '30d'
      });

      db.sessions[token] = user;

      const { password: _, ...userWithoutPassword } = user;

      res.json({
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
