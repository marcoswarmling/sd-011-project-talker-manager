const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { HTTP_OK_STATUS, HTTP_NOT_FOUND } = require('./httpStatusCodes');
const { validateEmail, validatePassword } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const data = fs.readFileSync('./talker.json');
  const talkers = JSON.parse(data);
  response.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', (request, response) => {
  const talkerId = Number(request.params.id);
  const data = fs.readFileSync('./talker.json');
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === talkerId);
  if (!talker) {
    return response.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', 
  validateEmail,
  validatePassword,
  (_request, response) => {
  const token = 'randomToken12345';
  return response.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
