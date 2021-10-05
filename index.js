const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');
const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
} = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await fs.readFile('talker.json', 'utf8');
  const response = JSON.parse(data);
  if (!response) {
    return res.status(200).json([]);
  }
  return res.status(200).json(response);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('talker.json', 'utf8');
  const response = JSON.parse(data);
  const talker = response.find((e) => e.id === parseInt(id, 10));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).send(talker);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token });
});

app.post('/talker', validateToken, validateName, validateAge, validateTalk, (req, res) => {
  const { name, age, talk } = req.body;
  res.status(201).json({ id: 1, name, age, talk });
  // fs.readFile('talker.json', 'utf8')
  //   .then((data) => JSON.parse(data))
  //   .then((talkers) => {
  //     const newTalkers = talkers.push({ name, age, talk });
  //     return fs.writeFile('talker.json', JSON.stringify(newTalkers));
  //   });
});

app.listen(PORT, () => {
  console.log('Online');
});
