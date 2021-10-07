const { Router } = require('express');

const fs = require('fs');

const router = Router();

router.get('/', (_req, res) => {
  const content = fs.readFileSync('./talker.json');
  const talkers = JSON.parse(content);
  res.status(200).json(talkers);
});

module.exports = router;