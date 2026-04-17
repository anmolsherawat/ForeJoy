const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.get('/my-winnings', auth, async (req, res) => {
  res.json([]);
});

module.exports = router;
