const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const { getTalkers } = require('./readTalker');
const {
  AgeVerify,
  nameVerify,
  TokenCreation,
  IDVerification,
  TokenVerification,
  ratedVerification,
  EmailVerification,
  PasswordVerification,
  watchedAtVerification,
} = require('./authTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 1

app.get('/talker', (_req, res) => {
  const talkers = getTalkers();
  res.status(200).send(talkers);
});

// Requisito 2

app.get('/talker/:id', IDVerification, (req, res) => {
  const { id } = req.params;
  const talkers = getTalkers();
  const filteredTalker = talkers.find(
    (talker) => Number(talker.id) === Number(id),
  );
  return res.status(200).json(filteredTalker);
});

// Requisito 3

app.post('/login', EmailVerification, PasswordVerification, TokenCreation);

// Requisito 4

app.post(
  '/talker',
  TokenVerification,
  watchedAtVerification,
  ratedVerification,
  nameVerify,
  AgeVerify,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = getTalkers();
    talkers.push({ id: talkers.length + 1, name, age, talk });
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
    return res.status(201).json({ id: talkers.length, name, age, talk });
  },
);
