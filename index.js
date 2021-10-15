const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const fs = require('fs').promises;
const rescue = require('express-rescue');

const crypto = require('crypto');
const {
  validateEmail,
  validatePassword } = require('./validate');

function getTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (_req, res) => {
  const talkers = await getTalkers();
  res.status(200).json(talkers);
}));

app.get('/talker/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talker = talkers.find((t) => t.id === Number(id));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
}));

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
