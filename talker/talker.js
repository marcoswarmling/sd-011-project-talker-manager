const fs = require('fs');
const express = require('express');

const router = express.Router();

router.get('/talker', (_req, res) => {
  const response = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  if (!response) return res.status(200).json([]);
  res.status(200).json(response);
});

module.exports = router;
