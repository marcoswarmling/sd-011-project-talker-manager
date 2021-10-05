const express = require('express');
const router = express.Router();
const fs = require('fs');
const HTTP_OK_STATUS = 200;

router.get('/talker', (req, res) => {
  const data = fs.readFileSync('./talker.json');
  const talker = JSON.parse(data);
  if (talker.length === 0) {
    res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).send(talker);
});

module.exports = router;
