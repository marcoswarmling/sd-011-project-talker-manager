const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs');
const fsAsync = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const listTalkers = './talker.json';

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 1°
app.get('/talker', (_req, res) => {
  fsAsync.readFile(listTalkers, 'utf8')
  .then((data) => { res.status(HTTP_OK_STATUS).json(JSON.parse(data)); })
  .catch(() => { res.status(HTTP_OK_STATUS).json(JSON.parse([])); });
});

// 2°
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerFind = await fsAsync.readFile(listTalkers, 'utf8')
  .then((response) => JSON.parse(response).find((talker) => talker.id === parseInt(id, 10)));
  if (!talkerFind) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerFind);
});

// 3°

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailModel = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailModel.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

app.post('/login', validateLogin, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token });
});

// 4°
const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateTalkerName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateTalkerAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.watchedAt || (!talk.rate && Number(talk.rate) !== 0)) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateTalkKeys = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  const dateRegex = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;
  if (!dateRegex.test(watchedAt)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!(Number(rate) >= 1 && Number(rate) <= 5)) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

app.post('/talker',
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalk,
  validateTalkKeys, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkersArr = JSON.parse(await fsAsync.readFile(listTalkers, 'utf8'));
  const availableId = talkersArr.length + 1;
  const newTalker = { name, age, id: availableId, talk };
  talkersArr.push(newTalker);
  res.status(201).json(newTalker);
  fsAsync.writeFile(listTalkers, JSON.stringify(talkersArr));
});

// 5°
app.put('/talker/:id',
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalk,
  validateTalkKeys, async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkersArr = JSON.parse(await fsAsync.readFile(listTalkers, 'utf8'));
  const onChangeProfileIndex = talkersArr.findIndex((talker) => Number(talker.id) === Number(id));
  const changesOnDemand = { name, age, id: Number(id), talk };
  talkersArr[onChangeProfileIndex] = changesOnDemand;
  fsAsync.writeFile(listTalkers, JSON.stringify(talkersArr));
  res.status(200).json(changesOnDemand);
});

// 6°
app.delete('/talker/:id',
  validateToken, async (req, res) => {
  const { id } = req.params;
  const talkersArr = JSON.parse(await fsAsync.readFile(listTalkers, 'utf8'));
  const onChangeProfileIndex = talkersArr.findIndex((talker) => Number(talker.id) === Number(id));
  talkersArr.splice(onChangeProfileIndex, 1);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  fsAsync.writeFile(listTalkers, JSON.stringify(talkersArr));
});

// 7°

app.listen(PORT, () => {
  console.log('Online');
});
