const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const fs = require('fs');

const { verifyEmail, verifyPassword } = require('./middleware/loginValidation');

const app = express();
app.use(bodyParser.json());

const talkers = './talker.json';
const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 500;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  try {
    const data = fs.readFileSync(talkers, 'utf8');
    const talker = JSON.parse(data);
    return response.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    return response.status(HTTP_ERROR_STATUS).json(error);
  }
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  try {
    const data = fs.readFileSync(talkers, 'utf8');
    const talker = JSON.parse(data);
    const getTalkerById = talker.find((r) => r.id === parseInt(id, 10));

    if (!getTalkerById) {
      return response
        .status(HTTP_NOT_FOUND_STATUS)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(HTTP_OK_STATUS).json(getTalkerById);
  } catch (error) {
    return response.status(HTTP_ERROR_STATUS).json(error);
  }
});

app.post('/login', verifyEmail, verifyPassword, (_request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
