const fs = require('fs');
const express = require('express');

const router = express.Router();

router.get('/talker', (_req, res) => {
  const file = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  if (!file) return res.status(200).json([]);

  res.status(200).json(file);
});

module.exports = router;
