const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const validateTalker = require('./validators/talkerSchema');
const validateToken = require('./validators/tokenSchema');

const router = express.Router();
const HTTP_OK_STATUS = 200;
const tokenLength = 8;
const tokenValue = crypto.randomBytes(tokenLength).toString('hex');
const { validEmail, validPassword } = require('./validations');

router.get('/talker', (req, res) => {
  const data = fs.readFileSync('./talker.json');
  const talker = JSON.parse(data);
  if (talker.length === 0) {
    res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).send(talker);
});

router.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync('./talker.json');
  const talker = JSON.parse(data);
  const talkerId = talker.find((person) => person.id === Number(id));
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).send(talkerId);
});

router.post('/login', validEmail, validPassword, (_req, res) => {
  console.log('teste');
  return res.status(201).json({ token: tokenValue });
});

// 4 - Crie o EndPoint POST / talker
router.post('/talker', validateToken, validateTalker, (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const talker = { name, age, talk: { watchedAt, rate } };
  const data = fs.readFileSync('./talker.json');
  const talkerList = JSON.parse(data);
  const newTalker = { id: talkerList.length + 1, ...talker };
  talkerList.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(talkerList));
  return res.status(201).send(newTalker);
});

module.exports = router;

// const newUser =  {
//   "name" : "John Doe",
// "age" : "25",
// "talk" : {
//  "watchedAt" : "2019-01-01",
//  "rate" : "5"
// }
// }
