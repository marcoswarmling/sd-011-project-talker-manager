const { Router } = require('express');

const fs = require('fs').promises;

const router = Router();

router.get('/', async (_req, res) => {
  const content = await fs.readFile('./talker.json');
  const talkers = JSON.parse(content);
  res.status(200).json(talkers);
});

module.exports = router;