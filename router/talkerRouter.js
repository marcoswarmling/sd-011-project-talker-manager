const { Router } = require('express');
const fs = require('fs');
const util = require('util');

const router = Router();

const readFilePromise = util.promisify(fs.readFile);

const HTTP_OK_STATUS = 200;

router.get('/', async (_request, response) => {
  try {
    const content = await readFilePromise('talker.json');
    const talker = JSON.parse(content);
    response.status(HTTP_OK_STATUS).json(talker);
  } catch (err) {
    response.status(HTTP_OK_STATUS).json([]);
  }
});

module.exports = router;