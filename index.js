const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const talkerArray = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  const passwordSize = 6;

  if (!password || password === '') {
    return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < passwordSize) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
// Referência do regex.

const checkEmail = (req, res, next) => {
  const regexCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexCheck.test(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

// 1

app.get('/talker', async (_req, res) => {
  const talkerList = await fs.readFile(talkerArray, 'utf-8');
    return res.status(HTTP_OK_STATUS).json(JSON.parse(talkerList));
});

// 2

app.get('/talker/:id', async (req, res) => {
  const talkerList = await fs.readFile(talkerArray, 'utf-8');
  const { id } = req.params;
  const talker = JSON.parse(talkerList).find((t) => t.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(talker);
});

// 3

app.post('/login', checkEmail, checkPassword,
(_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
