const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const { auth, checkSubscription } = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, checkSubscription, async (req, res) => {
  try {
    const userScores = db.mockData.scores.filter(s => s.user_id === req.user.id);
    res.json(userScores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post(
  '/',
  auth,
  checkSubscription,
  [
    body('score').isInt({ min: 1, max: 45 }),
    body('date').isISO8601(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const crypto = require('crypto');
      const newScore = {
        id: crypto.randomUUID(),
        user_id: req.user.id,
        score: parseInt(req.body.score),
        date: req.body.date,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      db.mockData.scores.push(newScore);
      res.status(201).json(newScore);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.delete('/:id', auth, checkSubscription, async (req, res) => {
  try {
    const scoreIndex = db.mockData.scores.findIndex(s => s.id === req.params.id && s.user_id === req.user.id);
    if (scoreIndex !== -1) {
      db.mockData.scores.splice(scoreIndex, 1);
    }
    res.json({ message: 'Score deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
