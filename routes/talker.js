const router = require('express').Router();
const fs = require('fs').promises;

router.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  res.status(200).json(JSON.parse(talkers));
});

module.exports = router;
