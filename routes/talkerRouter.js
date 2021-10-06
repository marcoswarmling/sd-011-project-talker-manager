const express = require('express');

const router = express.Router();
const fs = require('fs');

router.get('/', (_req, res) => {
  try {
    const talker = fs.readFileSync('./talker.json');
    res.status(200).json(JSON.parse(talker));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
