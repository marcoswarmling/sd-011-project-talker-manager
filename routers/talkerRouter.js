const router = require('express').Router();
const fs = require('fs').promises;
const rescue = require('express-rescue');

router.get('/', rescue(async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  res.status(200).json(talkers);
}));

module.exports = router;