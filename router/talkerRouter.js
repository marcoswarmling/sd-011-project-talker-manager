const router = require('express').Router();
const { readContentFile } = require('../helpers/files');

router.get('/', async (_req, res) => {
  const response = await readContentFile('../talker.json');
  const talker = response || [];
  res.status(200).json(talker);
});

module.exports = router;
