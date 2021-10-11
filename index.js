const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const talkers = require('./allTalkers');
const validateToken = require('./middlewares/validateToken');
const generateToken = require('./generateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateDate = require('./middlewares/validateDate');
const validateRate = require('./middlewares/validateRate');
const validateTalk = require('./middlewares/validateTalk');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const getTalkers = talkers.getTalkers();
    res.status(HTTP_OK_STATUS).json(getTalkers);
});

app.get('/talker/search',
validateToken,
(req, res) => {
  const { q } = req.query;
  const fileTalkers = talkers.getTalkers();
  const findTalker = fileTalkers
  .filter((a) => a.name.includes(q));
  if (findTalker) return res.status(200).json(findTalker);
  if (!q) return fileTalkers;
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const getTalkers = talkers.getTalkers();
  const talkerById = getTalkers
    .find((a) => a.id === Number(id));
    console.log(talkerById);
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkerById);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  const patternEmail = /[a-z0-9._-]+@[a-z0-9]+\.[a-z]+$/;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!patternEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = generateToken();
  res.status(200).json({ token });
});

app.post('/talker',
validateToken,
validateName,
validateAge,
validateTalk,
validateDate,
validateRate,
(req, res) => {
  const { name, age, talk } = req.body;
  const fileTalkers = talkers.getTalkers();
  const addTalker = {
    name,
    age,
    id: fileTalkers.length + 1,
    talk,
  };
  fileTalkers.push(addTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(fileTalkers));
  
  res.status(201).json(addTalker);
});

app.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateRate,
validateDate,
(req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const fileTalkers = talkers.getTalkers();
  const findTalkerId = fileTalkers
  .findIndex((talkerId) => talkerId.id === Number(id));
  const newTalker = { name, age, id: Number(id), talk };
  fileTalkers[findTalkerId] = newTalker;
  fs.writeFileSync('./talker.json', JSON.stringify(fileTalkers));
  res.status(200).json(fileTalkers[findTalkerId]);
});

app.delete('/talker/:id',
validateToken,
(req, res) => {
  const { id } = req.params;
  const fileTalkers = talkers.getTalkers();
  const findTalkerId = fileTalkers
  .filter((talkerId) => Number(id) !== talkerId.id);
  fs.writeFileSync('./talker.json', JSON.stringify(findTalkerId));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
