// Requisito 5
const express = require('express');

const router = express.Router();
const fs = require('fs');

const {
  verifyTokenIsValid,
  nameValidation,
  ageValidation,
  verifyTalkAndKeysExists,
  talkKeysValidation,
} = require('../middlewares/validateNewTalker');

const editTalkerById = [
  verifyTokenIsValid,
  nameValidation,
  ageValidation,
  verifyTalkAndKeysExists,
  talkKeysValidation,
];

router.put('/:id', editTalkerById, (req, res) => {
  const content = fs.readFileSync('./talker.json');
  const talkersList = JSON.parse(content);

  const { name, age, talk } = req.body;
  const { id } = req.params;

  const talkersIndex = talkersList.findIndex((t) => t.id === Number(id));

  talkersList[talkersIndex] = {
    id: +id,
    name,
    age,
    talk,
  };

  fs.writeFileSync('./talker.json', JSON.stringify(talkersList, null, 2));
  res.status(200).json(talkersList[talkersIndex]);
});

module.exports = router;
