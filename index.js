const express = require('express');
const bodyParser = require('body-parser');

const talkers = require('./allTalkers');
const generateToken = require('./generateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const getTalkers = talkers.getTalkers();
    res.status(HTTP_OK_STATUS).json(getTalkers);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const getTalkers = talkers.getTalkers();
  const talkerById = getTalkers
    .find((a) => a.id === Number(id));
    console.log(talkerById);
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkerById);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  const patternEmail = /[a-z0-9._-]+@[a-z0-9]+\.[a-z]+$/;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!patternEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = generateToken();
  res.status(200).json({ token });
});

app.post('/talker', (req, res) => {

});

app.listen(PORT, () => {
  console.log('Online');
});
