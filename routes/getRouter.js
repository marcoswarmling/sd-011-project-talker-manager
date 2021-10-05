const router = require('express').Router();
const readAllTalkers = require('../helpers/fileHelpers');

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
  const result = await readAllTalkers(PATH_FILE) || [];

  res.status(200).json({ result });
});

module.exports = router;