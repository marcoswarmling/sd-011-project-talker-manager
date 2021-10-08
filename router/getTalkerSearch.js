const { Router } = require('express');
const fs = require('fs');
const util = require('util');

const router = Router();

const validation = require('./validation');

const readFilePromise = util.promisify(fs.readFile);

const HTTP_OK_STATUS = 200;

const Validations = [
  validation.tokenExists,
  validation.validateToken,
];

router.get('/', Validations, async (request, response) => {
  const { q } = request.query;
  const content = await readFilePromise('talker.json');
  const talkerJson = JSON.parse(content);
  const talkerSearch = talkerJson.filter((talker) => talker.name.includes(q));
  return response.status(HTTP_OK_STATUS).json(talkerSearch);
});

module.exports = router;