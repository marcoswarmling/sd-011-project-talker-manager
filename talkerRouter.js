const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const talkers = fs.readFileSync('./talker.json', 'utf8');
    res.status(200).json(JSON.parse(talkers));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;