const router = require('express').Router();
const fs = require('fs').promises;

const data = './talker.json';
const HTTP_OK_STATUS = 200;

router.get('/', async (_req, res) => {
  const response = await fs.readFile(data, 'utf-8');

  if (response.length < 1) return res.status(HTTP_OK_STATUS).send([]);

  return res.status(HTTP_OK_STATUS).json(JSON.parse(response));
});

module.exports = router;
