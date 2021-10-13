const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const talker = 'talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const validateEmail = (request, response, next) => {
  const { email } = request.body;
  const regex = /\S+@\S+\.\S+/;
  // Referência: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const validationEmail = regex.test(email);

  if (!email || email === '') {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validationEmail) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;

  if (!password || password === '') {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};
app.get('/talker', (_request, response) => {
  const data = JSON.parse(fs.readFileSync(talker, 'utf8'));
  if (data.length === 0) return response.status(HTTP_OK_STATUS).json([]);
  response.status(HTTP_OK_STATUS).send(data);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const data = JSON.parse(fs.readFileSync(talker));
  const talkerById = data.find((talkId) => talkId.id === Number(id));
  if (!talkerById) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(talkerById);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validateEmail, validatePassword, (request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

app.listen(PORT, () => {
  console.log('Online');
});
