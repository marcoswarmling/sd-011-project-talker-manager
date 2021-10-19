// Requisito 4 pt 2
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const {
  tokenIsValid,
  nameIsValid,
  ageIsValid,
  watchedAtIsValid,
  rateIsValid,
} = require('../midlewares/validateOtherTalker');

const validations = [
  tokenIsValid,
  nameIsValid,
  ageIsValid,
  watchedAtIsValid,
  rateIsValid,
];

router.post('/', validations, async (req, res) => {
  const {
    name,
    age,
    talk: { watchedAt, rate },
  } = req.body;

  const talkList = await fs.readFile('./talker.json', 'utf-8');
  const talkListjson = JSON.parse(talkList);
  const id = talkListjson.length + 1;

  const newTalker = { name, age, id, talk: { watchedAt, rate } };

  talkListjson.push(newTalker);
  const newList = JSON.stringify(talkListjson);
  await fs.writeFile('./talker.json', newList);

  return res.status(201).json(newTalker);
});

module.exports = router;
