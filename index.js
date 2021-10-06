const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const talkers = require('./functionsAsync');
const { generateToken, validateEmail,
  validatePassword, validateToken,
  validateName, validateAge, validateRate,
  validateTalk, validateObjTalk, validateWatchedAt } = require('./auths');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1 - Crie o endpoint GET /talker

app.get('/talker', rescue(async (_req, res) => {
  const talkersAsync = await talkers.getTalkers();

  if (!talkersAsync) return res.status(200).json([]);
  
  res.status(200).json(talkersAsync);
}));

// Requisito 2 - Crie o endpoint GET /talker/:id

app.get('/talker/:id', rescue(async (req, res) => {
  const talkersAsync = await talkers.getTalkers();
  const { id } = req.params;
  
  const talkerID = talkersAsync.find((t) => t.id === parseInt(id, 10));
  console.log(talkerID);
  if (!talkerID) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talkerID);
}));

// Requisito 3 - Crie o endpoint POST /login

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });  
});

// Requisito 4 - Crie o endpoint POST /talker

app.post('/talker', validateToken, validateName,
validateAge, validateTalk, validateWatchedAt,
validateObjTalk, validateRate,
 rescue(async (req, res) => {
  const talkersAsync = await talkers.getTalkers();
  const { name, age, talk } = req.body;
  const newTalkerId = talkersAsync.length + 1;
  const newTalker = { id: newTalkerId, name, age, talk };
  talkersAsync.push(newTalker);
 
  await talkers.setTalkers(talkersAsync);
  res.status(201).json(newTalker);
}));

app.put('/talker/:id', validateToken, validateName,
validateAge, validateTalk, validateWatchedAt,
validateObjTalk, validateRate,
 rescue(async (req, res) => {
  const talkersAsync = await talkers.getTalkers();
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const findTalker = talkersAsync.findIndex((t) => t.id === parseInt(id, 10));
  
  talkersAsync[findTalker] = { ...talkersAsync[findTalker], name, age, talk };
  
  await talkers.setTalkers(talkersAsync);
  res.status(200).json(talkersAsync[findTalker]);
 }));

app.delete('/talker/:id', validateToken, rescue(async (req, res) => {
  const talkersAsync = await talkers.getTalkers();
  const { id } = req.params;

  const deleteTalker = talkersAsync.findIndex((t) => t.id === parseInt(id, 10));

  if (deleteTalker === -1) {
    return res.status(404).json({ message: 'Id not found' });
  }

  talkersAsync.splice(deleteTalker, 1);
  await talkers.setTalkers(talkersAsync);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

app.listen(PORT, () => {
  console.log('Online');
});
