const router = require('express').Router();

const fs = require('fs');

router.get('/', (req, res) => {
  const talker = fs.readFileSync('./talker.json', 'utf-8');

  res.status(200).json(JSON.parse(talker));
});

module.exports = router;