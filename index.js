const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const authMiddleware = require('./authMiddleware');
const generateToken = require('./generateToken');
const authTokenMiddleware = require('./authTokenMiddleware');
const newTalkerMiddleware = require('./newTalkerMiddleware');
const validateKeyTalk = require('./validateKeyTalk');
const validateTalk = require('./validateTalk');
const validateRate = require('./validateRate');
const validateWatchedAt = require('./validateWatchedAt');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const endPoint = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const responseFile = JSON.parse(fs.readFileSync(endPoint, 'utf8'));
  if (responseFile.length === 0) {
    return response.status(200).json([]);
  }
  response.status(200).send(responseFile);
});

app.get('/talker/search', authTokenMiddleware, (request, response) => {
  const { q } = request.query;
  const responseFile = JSON.parse(fs.readFileSync(endPoint, 'utf8'));
  const talkers = responseFile.filter(({ name: nameTalker }) => nameTalker.includes(q));
  
  response.status(200).send(talkers);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const responseFile = JSON.parse(fs.readFileSync(endPoint, 'utf8'));
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

app.post('/talker', authTokenMiddleware, newTalkerMiddleware, validateKeyTalk, validateTalk,
  (request, response) => {
  const { name, age, talk } = request.body;
  const { watchedAt, rate } = talk;
  
  const responseFile = JSON.parse(fs.readFileSync(endPoint, 'utf8'));
  const newTalker = {
    id: responseFile.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  responseFile.push(newTalker);
  fs.writeFileSync(endPoint, JSON.stringify(responseFile));
  response.status(201).send(newTalker);
});

app.put('/talker/:id', 
authTokenMiddleware, 
newTalkerMiddleware, 
validateRate, validateKeyTalk, validateTalk, validateWatchedAt,
(req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const responseFile = JSON.parse(fs.readFileSync(endPoint, 'utf8'));
  const talkerIndex = responseFile.findIndex(({ id: idTalker }) => Number(idTalker) === Number(id));
 
  responseFile[talkerIndex] = { 
    ...responseFile[talkerIndex], 
    name, 
    age, 
    talk: { watchedAt, rate } };
  fs.writeFileSync(endPoint, JSON.stringify(responseFile));
  res.status(200).send(responseFile[talkerIndex]);
});

app.delete('/talker/:id', authTokenMiddleware, (request, response) => {
  const { id } = request.params;
  const responseFile = JSON.parse(fs.readFileSync(endPoint, 'utf8'));
  const talkerIndex = responseFile.filter(({ id: idTalker }) => Number(idTalker) !== Number(id));
  
  fs.writeFileSync(endPoint, JSON.stringify(talkerIndex));
  response.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
