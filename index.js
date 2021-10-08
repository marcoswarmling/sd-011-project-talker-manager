const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { HTTP_OK_STATUS, HTTP_NOT_FOUND, HTTP_CREATED_STATUS } = require('./httpStatusCodes');
const { 
  validateEmail,
  validatePassword,
  authentication,
  validateTalkerData,
} = require('./middlewares');

const FILE_PATH = './talker.json';

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const data = await fs.readFile(FILE_PATH);
  const talkers = JSON.parse(data);
  response.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/search', authentication, async (request, response) => {
  console.log(request.query);
  const { q } = request.query;
  const data = await fs.readFile(FILE_PATH);
  const talkers = JSON.parse(data);
  let results;
  if (!q) {
    results = talkers;
  } else {
    results = talkers.filter((talker) => talker.name.includes(q));
  }
  return response.status(HTTP_OK_STATUS).json(results);
});

app.get('/talker/:id', async (request, response) => {
  const talkerId = Number(request.params.id);
  const data = await fs.readFile(FILE_PATH);
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

app.post('/talker', authentication, ...validateTalkerData, async (request, response) => {
  const { name, age, talk } = request.body;
  const data = await fs.readFile(FILE_PATH);
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
  await fs.writeFile(FILE_PATH, JSON.stringify(newData));
  return response.status(HTTP_CREATED_STATUS).json(newTalker);
});

app.put('/talker/:id', authentication, ...validateTalkerData, async (request, response) => {
  const { name, age, talk } = request.body;
  const talkerId = Number(request.params.id);

  const data = await fs.readFile(FILE_PATH);
  const talkers = JSON.parse(data);
  const talkerIndex = talkers.findIndex((t) => t.id === talkerId);
  if (talkerIndex < 0) {
    return response.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  const updatedTalker = {
    name,
    age,
    id: talkers[talkerIndex].id,
    talk,
  };
  talkers[talkerIndex] = updatedTalker;
  await fs.writeFile(FILE_PATH, JSON.stringify(talkers));
  return response.status(HTTP_OK_STATUS).json(updatedTalker);
});

app.delete('/talker/:id', authentication, async (request, response) => {
  const talkerId = Number(request.params.id);
  const data = await fs.readFile(FILE_PATH);
  const talkers = JSON.parse(data);
  const talkerIndex = talkers.findIndex((t) => t.id === talkerId);
  if (talkerIndex < 0) {
    return response.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  talkers.splice(talkerIndex, 1);
  await fs.writeFile(FILE_PATH, JSON.stringify(talkers));
  return response.status(HTTP_OK_STATUS).json({
    message: 'Pessoa palestrante deletada com sucesso',
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
