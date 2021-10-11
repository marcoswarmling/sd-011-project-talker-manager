const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const fileContent = fs.readFileSync('./talker.json', 'utf8');
    const talkers = JSON.parse(fileContent);
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;