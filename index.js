const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');
const { 
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
} = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerJsonFile = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// REQUISITO 1
app.get('/talker', async (_req, res) => {
  const data = await fs.readFile(talkerJsonFile, 'utf-8');
  const talkers = await JSON.parse(data);
  if (!talkers) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

// REQUISITO 2
app.get('/talker/:id', async (req, res) => {
  const data = await fs.readFile(talkerJsonFile, 'utf-8');
    const talkers = JSON.parse(data);
    const { id } = req.params;
    const talker = talkers.find((person) => person.id === Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talker);
});

// GET TOKEN
// function getToken() {
//   const base = '0123456789ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvwxyz';
//   const tokenLength = 16;
//   const token = [];
//   for (let i = 0; i < tokenLength; i += 1) {
//     const randomPosition = Math.floor(Math.random() * base.length + 1);
//     token.push(base.charAt(randomPosition));
//   }
//   token.join('');
//   return token;
// }
const getToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

// REQUISITO 3
app.post(
  '/login',
  validateEmail,
  validatePassword, (_req, res) => { res.status(200).json({ token: getToken() }); },
);

app.listen(PORT, () => {
  console.log('Online');
});
