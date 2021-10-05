const fs = require('fs').promises;

const express = require('express');

const router = express.Router();

router.get('/', async (_req, res) => {
  const getTalkers = await fs.readFile('./talker.json', 'utf-8');
  res.status(200).json(JSON.parse(getTalkers));
});

module.exports = router;
