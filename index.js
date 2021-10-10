const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_STATUS_404 = 404;
const HTTP_STATUS_400 = 400;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const fs = require('fs').promises;

app.get('/talker', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');

  res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
});

app.get('/talker/:id', async (req, res) => {
  const readData = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(readData);
  const { id } = req.params;
  const talkerFound = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!talkerFound) {
    return res.status(HTTP_STATUS_404).send({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(talkerFound);
});

function validatePassword(password, res) {
  if (!password || password === '') {
    return res.status(HTTP_STATUS_400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(HTTP_STATUS_400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  if (!email || email === '') {
    return res.status(HTTP_STATUS_400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return res.status(HTTP_STATUS_400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  validatePassword(password, res);

  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});