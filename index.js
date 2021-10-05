const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const authMiddleware = require('./authMiddleware');
const generateToken = require('./generateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const responseFile = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  if (responseFile.length === 0) {
    return response.status(200).json([]);
  }
  response.status(200).send(responseFile);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const responseFile = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talker = responseFile.find(({ id: idTalker }) => Number(idTalker) === Number(id));
  if (!talker) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(200).send(talker);
});

app.post('/login', authMiddleware, (_request, response) => {
  const token = generateToken(16);
  response.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
