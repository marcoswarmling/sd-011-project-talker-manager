const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const { HTTP_OK_STATUS, HTTP_UNAUTHORIZED } = require('./httpStatusCode');

const app = express();
app.use(bodyParser.json());

// const HTTP_OK_STATUS = 200;
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
  if (!name) return res.status(200).json(talkers);
  const queryTalkers = talkers.filter((t) => t.name.includes(name));
  res.status(200).json(queryTalkers);
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const talkers = await FILE();
  const { id } = req.params;
  const myTalker = talkers.find((t) => t.id === parseInt(id, 10));
  if (!myTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(myTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
