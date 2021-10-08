// Requisito 4
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const {
  verifyTokenIsValid,
  nameValidation,
  ageValidation,
  verifyTalkAndKeysExists,
  talkKeysValidation,
} = require('../middlewares/validateNewTalker');

const newTalkerValidations = [
  verifyTokenIsValid,
  nameValidation,
  ageValidation,
  verifyTalkAndKeysExists,
  talkKeysValidation,
];

router.post('/', newTalkerValidations, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkerList = await fs.readFile('./talker.json', 'utf-8');
  const talkerListJson = JSON.parse(talkerList);
  const id = talkerListJson.length + 1;

  const newTalker = { name, age, id, talk: { watchedAt, rate } };

  talkerListJson.push(newTalker);

  const newTalkerList = JSON.stringify(talkerListJson);
  await fs.writeFile('./talker.json', newTalkerList);

  return res.status(201).json(newTalker);
});

module.exports = router;
