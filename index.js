const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const getTalkers = () => JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

const isEmailValid = (email) => {
  return (/^[\w.]+@[a-z]+\.\w{2,3}$/g).test(email);
}

const text = 'a1b2c3d4e5f6g7h8i9j0klmnopqrstuvwxyz';
const generateToken = () => {
  let token = '';
  for (let index = 0; index < 16; index += 1) {
    const position = Math.round(Math.random() * 16, 0);
    token += text[position];
  }
  return token;
};

console.log(generateToken());

// Requisito 1:
app.get('/talker', (_req, res) => {
  res.status(200).json(getTalkers());
});

// Requisito 2:
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = getTalkers().find((item) => item.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

// Requisito 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  let message = '';
  // email:
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isEmailValid(email)) {
    message = 'O "email" deve ter o formato "email@email.com"';
    return res.status(400).json({ message }); 
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    message = 'O "password" deve ter pelo menos 6 caracteres';
    return res.status(400).json({ message });
  }
  res.status(200).json({ token: generateToken() });
});

app.listen(PORT, () => {
  console.log('Online');
});
