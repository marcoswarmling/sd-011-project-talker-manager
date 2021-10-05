const router = require('express').Router();
const { readFile } = require('../utils/fsutils');

const jsonTalker = 'talker.json';

router.get('/talker', async (_req, res) => {
  const result = JSON.parse(await readFile(jsonTalker));
  if (result.length < 1) return res.status(200).json([]);
  res.status(200).json(result);
});

module.exports = router;