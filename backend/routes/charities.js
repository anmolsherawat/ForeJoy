const express = require('express');
const db = require('../config/db');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let charities = [...db.mockData.charities];

    if (search) {
      const searchLower = search.toLowerCase();
      charities = charities.filter(c =>
        c.name.toLowerCase().includes(searchLower) ||
        (c.description && c.description.toLowerCase().includes(searchLower))
      );
    }

    res.json(charities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const charity = db.mockData.charities.find(c => c.id === id);

    if (!charity) {
      return res.status(404).json({ message: 'Charity not found' });
    }

    res.json(charity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
