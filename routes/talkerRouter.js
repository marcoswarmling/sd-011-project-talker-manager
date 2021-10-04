const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile('./talker.json', 'utf8');
    const talker = JSON.parse(data);
    return res.status(200).json(talker);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;