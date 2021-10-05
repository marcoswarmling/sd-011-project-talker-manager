const router = require('express').Router();

const { readFile } = require('../helper/readWriteHelper');

const PATHNAME = './talker.json';

router.get('/', async (_req, res) => {
  const result = await readFile(PATHNAME) || [];
  res.status(200).json(result);
});

module.exports = router;