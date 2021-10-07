const fs = require('fs');
const express = require('express');

const router = express.Router();

// Requisito 1 - GET com todos os talkers
router.get('/talker', (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  res.status(200).json(talkers);
});

module.exports = router;
