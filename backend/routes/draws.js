const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json([]);
});

router.get('/latest', async (req, res) => {
  res.json(null);
});

module.exports = router;
