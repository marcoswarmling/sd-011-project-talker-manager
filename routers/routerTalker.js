const router = require('express').Router();

const { getTalkers } = require('../helpers/readFile');

router.get('/', async (_req, res) => {
  const talkers = await getTalkers('talker.json');
  if (!talkers) res.status(200).json([]);

  res.status(200).json(talkers);
});

module.exports = router;