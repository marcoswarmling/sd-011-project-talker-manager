const router = require('express').Router();

const { readFileContent } = require('../middlewares/middlewares');

router.get('/', async (_req, res) => {
  const fileContent = await readFileContent('./talker.json') || [];
  res.status(200).json(fileContent);
});

module.exports = router;
