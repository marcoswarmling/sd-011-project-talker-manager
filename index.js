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
  const id = parseInt(req.params.id);
  const talkers = await fs
    .readFile('./talker.json', 'utf-8')
    .then((file) => JSON.parse(file));
  const findId = talkers.find((talker) => {
    return talker.id === id;
  });
  if (!findId) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(findId);
}

app.get('/talker/:id', talkerID);
