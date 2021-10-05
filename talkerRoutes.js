const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json');
  const result = JSON.parse(talkers);
  res.status(200).json(result);
});

module.exports = router;