const { Router } = require('express');
const fs = require('fs');
const util = require('util');

const router = Router();

const validation = require('./validation');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const Validations = [
  validation.tokenExists,
  validation.validateToken,
  validation.nameExists,
  validation.validateName,
  validation.ageExists,
  validation.talkExists,
  validation.validateWatchedAt,
  validation.rateExists,
];

router.post('/', Validations, async (request, response) => {
  const { name, age, talk: { watchedAt, rate } } = request.body;
  const content = await readFilePromise('talker.json');
  const talker = JSON.parse(content);
  const newTalker = {
    name,
    age,
    id: (talker.length + 1),
    talk: {
      watchedAt,
      rate,
    },
  };
  talker.push(newTalker);
  await writeFilePromise('talker.json', JSON.stringify(talker));
  response.status(201).json(newTalker);
});

module.exports = router;