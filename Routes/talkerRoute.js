const router = require('express').Router();
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const data = './talker.json';

router.get('/', async (_req, res) => {
  const file = await fs.readFile(data, 'utf-8');
  if (file.length < 1) return res.status(HTTP_OK_STATUS).send([]);
  return res.status(HTTP_OK_STATUS).json(JSON.parse(file));
});

module.exports = router;
