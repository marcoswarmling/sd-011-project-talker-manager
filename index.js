const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

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

async function talkersList(_req, res) {
  const talkes = await fs
    .readFile('./talker.json', 'utf-8')
    .then((file) => JSON.parse(file));
  res.status(200).json(talkes);
}

app.get('/talker', talkersList);

async function talkerID(req, res) {
  const id = parseInt(req.params.id, 0);
  const talkers = await fs
    .readFile('./talker.json', 'utf-8')
    .then((file) => JSON.parse(file));
  const findId = talkers.find((talker) => talker.id === id);
  if (!findId) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(findId);
}

app.get('/talker/:id', talkerID);

function createToken() {
  const alphabet = 'abcdefghijklmnopqrstuvxywz1234567890'.split('');
  const token = [];
  for (let index = 0; index < 16; index += 1) {
    const positionArray = Math.floor(Math.random() * 36);
    token.push(alphabet[positionArray]);
  }

  return token.join('');
}

console.log(createToken());
