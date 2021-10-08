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

router.put('/:id', Validations, async (request, response) => {
  const { id } = request.params;
  const { name, age, talk: { watchedAt, rate } } = request.body;
  const content = await readFilePromise('talker.json');
  const talkerJson = JSON.parse(content);
  const otherTalker = talkerJson.filter((t) => t.id !== +id);
  const editedTalker = {
    name,
    age,
    id: +id,
    talk: {
      watchedAt,
      rate,
    },
  };
  otherTalker.push(editedTalker);
  await writeFilePromise('talker.json', JSON.stringify(otherTalker));
  return response.status(200).json(editedTalker);
});

module.exports = router;