const express = require('express');
const router = express.Router();

router.get('/analytics', async (req, res) => {
  res.json({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
    totalWinners: 0,
    recentSubscriptions: [],
    charityStatistics: []
  });
});

router.get('/users', async (req, res) => {
  res.json([]);
});

module.exports = router;
