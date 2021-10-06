const crypto = require('crypto');
const express = require('express');
const fs = require('fs').promises;
const validateTalker = require('./validators/talkerSchema');
const validateToken = require('./validators/tokenSchema');

const talkerJSON = './talker.json';

const router = express.Router();
const HTTP_OK_STATUS = 200;
const tokenLength = 8;
const tokenValue = crypto.randomBytes(tokenLength).toString('hex');
const { validEmail, validPassword } = require('./validations');

// 1. Get all talkers
router.get('/talker', async (_req, res) => {
  const data = await fs.readFile(talkerJSON);
  const talker = JSON.parse(data);
  if (talker.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return res.status(HTTP_OK_STATUS).send(talker);
});

// 3 - Create Endpoint Login

router.post('/login', validEmail, validPassword, (_req, res) => {
  const obj = { token: tokenValue };
  return res.status(200).json(obj);
});

// 4 - Crie o EndPoint POST / talker
router.post('/talker', validateToken, validateTalker, async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const talker = { name, age, talk: { watchedAt, rate } };
  const data = await fs.readFile(talkerJSON);
  const talkerList = await JSON.parse(data);
  const newTalker = { id: talkerList.length + 1, ...talker };
  talkerList.push(newTalker);
  await fs.writeFile(talkerJSON, JSON.stringify(talkerList));
  return res.status(201).send(newTalker);
});

// 5 - Crie o endpoint PUT /talker/:id
router.put('/talker/:id', validateToken, validateTalker, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const data = await fs.readFile(talkerJSON);
  const talkerList = await JSON.parse(data);
  const newTalker = { name, age, id: Number(id), talk: { watchedAt, rate } };
  const index = talkerList.findIndex((person) => person.id === Number(id));
  talkerList[index] = newTalker;
  await fs.writeFile(talkerJSON, JSON.stringify(talkerList));
  return res.status(200).send(newTalker);
});

// 6 - Crie o endpoint DELETE /talker/:id
router.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(talkerJSON);
  const talkerList = await JSON.parse(data);
  const index = talkerList.findIndex((person) => person.id === Number(id));
  talkerList.splice(index, 1);
  await fs.writeFile(talkerJSON, JSON.stringify(talkerList));
  return res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
});

// 7 - Crie o endpoint GET /talker/search?q=searchTerm
router.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const data = await fs.readFile(talkerJSON);
  const talkerList = await JSON.parse(data);
  console.log(q);
  const talker = talkerList.filter((person) => person.name.toLowerCase().includes(q.toLowerCase()));
  if (talker.length === 0) {
    return res.status(404).json(talkerList);
  }
  return res.status(200).send(talker);
});

// 2 - Crie o endpoint GET /talker/:id
router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(talkerJSON);
  const talker = await JSON.parse(data);
  const talkerId = talker.find((person) => person.id === Number(id));
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).send(talkerId);
});

module.exports = router;

// const newUser =  {
//   "name" : "John Doe",
// "age" : 25,
// "talk" : {
//  "watchedAt" : "03/05/2018",
//  "rate" : 5
// }
// }
