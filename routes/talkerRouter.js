const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const talkers = fs.readFileSync('./talker.json', 'utf-8');

    return res.status(200).json(JSON.parse(talkers));
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
