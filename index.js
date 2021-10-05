const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const { verifyEmail, verifyPassword } = require('./helpers/verifyCredentials');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 1 - Crie o endpoint GET /talker
app.get('/talker', (req, res) => {
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

  // Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o status 200.
  if (data.length === 0) return res.status(200).json([]);

  // O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas.
    res.status(200).json(data);
});

// 2 - Crie o endpoint GET /talker/:id
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

  const talkerFound = data.find((t) => t.id === Number(id));

  // Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404
  if (!talkerFound) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 

  // O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200
  res.status(200).json(talkerFound);
});

// 3 - Crie o endpoint POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!verifyEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (!verifyPassword(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const token = crypto.randomBytes(8).toString('hex');

  // O endpoint deverá retornar um código de status 200 com o token gerado.
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
