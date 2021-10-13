const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const {
  emailValidation,
  passwordValidation,
  generateToken,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
} = require('./fieldsValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1 - Crie o endpoint GET /talker
app.get('/talker', async (req, res) => {
  const returnedTalkers = await fs.readFile('./talker.json', 'utf-8');
  if (!returnedTalkers) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(JSON.parse(returnedTalkers));
});

// Requisito 2 - Crie o endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const returnedTalkers = await fs.readFile('./talker.json', 'utf-8');
  const talkersDB = JSON.parse(returnedTalkers);
  const { id } = req.params;
  const talkerId = talkersDB.find((talker) => talker.id === Number(id));
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talkerId);
});

// Requisito 3 - Crie o endpoint POST /login
app.post('/login',
  emailValidation,
  passwordValidation,
  generateToken);

// Requisito 4 - Crie o endpoint POST /talker
app.post('/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation);

app.listen(PORT, () => {
  console.log('Online');
});
