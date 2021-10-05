const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

router.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);

  return res.status(200).json(talker);
});

module.exports = router;
