const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (_req, res) => {
  const talker = fs.readFileSync('./talker.json');
  const parseTalk = JSON.parse(talker);
  res.status(200).json(parseTalk);
});

module.exports = router;
