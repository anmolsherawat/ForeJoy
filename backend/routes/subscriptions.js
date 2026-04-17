const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/create-checkout-session', auth, async (req, res) => {
  res.json({ url: 'https://example.com/success' });
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  res.json({ received: true });
});

router.get('/portal', auth, async (req, res) => {
  res.json({ url: 'https://example.com/portal' });
});

module.exports = router;
