const router = require('express').Router();
const fs = require('fs');

router.get('/', (_req, res) => {
  const talkers = fs.readFileSync('./talker.json', 'utf-8');
  
  res.status(200).json(JSON.parse(talkers));
});

module.exports = router;
