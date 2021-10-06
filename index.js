const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const talkerRouter = require('./talkerRouter');

const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!email.match(regEmail)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}, (_req, res) => {
  const token = crypto.randomBytes(16).toString('hex').substr(0, 16);
  res.status(HTTP_OK_STATUS).json({ token });
});

app.use((err, _req, res, _next) => { 
  res.status(500).json({ error: `Erro: ${err.message}` });
});

app.listen(PORT, () => {
  console.log('Online');
});
