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

app.listen(PORT, () => {
  console.log('Online');
});

// fs.readFile('./talker.json', (err, content) => {
//   if(err) {
//     console.log(`Erro ao ler o arquivo: ${err.message}`);
//     return;
//   }
//   let contentFile = content.toString('utf8');
//   talkers = JSON.parse(contentFile);
// });

function getTalkers() {
  try {
    const data = fs.readFileSync('./talker.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(`Erro ao ler o arquivo: ${err}`);
  }
}

function isEmailValid(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function generateToken(length) {
  const possibleChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const response = [];
  for (let i = 0; i < length; i += 1) {
    const randomNumber = (Math.random() * (possibleChars.length - 1)).toFixed(0);
    const randomChar = possibleChars[randomNumber];
    response.push(randomChar);
  }
  return response.join('');
}

app.get('/talker', (req, res) => {
  const talkers = getTalkers();
  res.status(200).json(talkers);
});

app.get('/talker/:id', (req, res) => {
  const talkers = getTalkers();
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isEmailValid(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({
    token: generateToken(16),
  });
});