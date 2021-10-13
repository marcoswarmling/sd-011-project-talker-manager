const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const crypto = require('crypto');
const { 
  HTTP_OK_STATUS,
  HTTP_UNAUTHORIZED,
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
} = require('./httpStatusCode');

const app = express();
app.use(bodyParser.json());

// const HTTP_OK_STATUS = HTTP_OK_STATUS;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const FILE = async () => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(file);
};

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

// Requisito 1
app.get('/talker', async (_request, response) => {
  const data = await fs.readFile(FILE);
  const talkers = JSON.parse(data);
  response.status(HTTP_OK_STATUS).json(talkers);
});

// Requisito 7:

app.get('/talker/search', tokenValidation, async (req, res) => {
  const { name } = req.query;
  const talkers = await FILE();
  if (!name) return res.status(HTTP_OK_STATUS).json(talkers);
  const queryTalkers = talkers.filter((t) => t.name.includes(name));
  res.status(HTTP_OK_STATUS).json(queryTalkers);
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const talkers = await FILE();
  const { id } = req.params;
  const myTalker = talkers.find((t) => t.id === parseInt(id, 10));
  if (!myTalker) { 
    return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' }); 
}
  res.status(HTTP_OK_STATUS).json(myTalker);
});

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email === '') { 
    return res
    .status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!reg.test(email)) { 
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

app.post('/login', validateEmail, validatePassword, (req, res) => {
  // https://www.codegrepper.com/code-examples/javascript/js+random+generate+token
  const token = crypto.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
