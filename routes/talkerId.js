// Requisito 5 pt2
const express = require('express');

const router = express.Router();
const fs = require('fs');

const {
    tokenIsValid,
    nameIsValid,
    ageIsValid,
    talkIsValid,
    watchedAtIsValid,
    rateIsValid,  
} = require('../midlewares/validateOtherTalker');

const editTalkerById = [
    tokenIsValid,
    nameIsValid,
    ageIsValid,
    talkIsValid,
    watchedAtIsValid,
    rateIsValid,
];

router.put('/:id', editTalkerById, (req, res) => {
  const content = fs.readFileSync('./talker.json');
  const talkList = JSON.parse(content);

  const { name, age, talk } = req.body;
  const { id } = req.params;

  const talkIndex = talkList.findIndex((t) => t.id === Number(id));

  talkList[talkIndex] = {
    id: +id,
    name,
    age,
    talk,
  };

  fs.writeFileSync('./talker.json', JSON.stringify(talkList, null, 2));
  res.status(200).json(talkList[talkIndex]);
});

module.exports = router;