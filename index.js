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

app.listen(PORT, () => {
  console.log('Online');
});
