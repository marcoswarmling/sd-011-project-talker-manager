const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { HTTP_OK_STATUS, HTTP_NOT_FOUND, HTTP_CREATED_STATUS } = require('./httpStatusCodes');
const { 
  validateEmail,
  validatePassword,
  authentication,
  validateNewTalker,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);
  response.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (request, response) => {
  const talkerId = Number(request.params.id);
  const data = await fs.readFile('./talker.json');
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

app.post('/talker', authentication, ...validateNewTalker, async (request, response) => {
  const { name, age, talk } = request.body;
  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);
  const newTalker = { 
    name,
    age,
    id: talkers.length + 1,
    talk,
  };
  const newData = [
    ...talkers,
    newTalker,
  ];
  await fs.writeFile('./talker.json', JSON.stringify(newData));
  return response.status(HTTP_CREATED_STATUS).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
