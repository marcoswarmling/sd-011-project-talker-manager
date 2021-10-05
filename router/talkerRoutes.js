const router = require('express').Router();

const { readFile } = require('../helper/readWriteHelper');

const PATHNAME = '/home/rafael/Documents/projects/sd-011-project-talker-manager/talker.json';

router.get('/', async (_req, res) => {
  const result = await readFile(PATHNAME) || [];
  res.status(200).json(result);
});

module.exports = router;