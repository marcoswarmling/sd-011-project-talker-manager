const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const {
  validateLogin,
  genToken,
  validateToken,
  validateName,
  validateAge,
  validateData,
  validateRate,
  validateTalk,
} = require('./middlewareNFunc');

const talkerFile = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// --------------------------------------------------------//
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// --------------------------------------------------------//

// test getAllTalkers.test.js
app.get('/talker', (_req, res) => {
  const talker = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
  
  if (talker.length > 0) {
    return res.status(200).json(talker);
  }
  
  if (talker.length === 0) {
    return res.status(200).json([]);
  }
});

// test getTalkerById.test.js
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
  const talkerId = talker.find((t) => t.id === Number(id));
  
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  if (talkerId) {
    return res.status(200).json(talkerId);
  }
});

// test login.test.js
app.post('/login', validateLogin, (req, res) => {
    const token = genToken();
    return res.status(200).json({ token });
});

// test createTalker.test.js
app.post('/talker', validateToken, validateName,
  validateAge,
  validateData,
  validateRate,
  validateTalk, (req, res) => {
  const { name, age, talk } = req.body;
  const talker = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
  const newPerson = { id: talker.length + 1, name, age, talk };
  talker.push(newPerson);
  fs.writeFileSync(talkerFile, JSON.stringify(talker));
  return res.status(201).json(newPerson);
});

// npm run test editTalker.test.js
app.put('/talker/:id', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateData,
  validateRate, (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talker = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
  const talkerId = talker.filter((t) => t.id !== Number(id));
  const editPerson = { id: Number(id), name, age, talk };
  talkerId.push(editPerson);
  fs.writeFileSync(talkerFile, JSON.stringify(talkerId));
  return res.status(200).json(editPerson);
});

// npm run test deleteTalker.test.js
app.delete('/talker/:id', 
  validateToken,
  (req, res) => {
  const { id } = req.params;

  const talker = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
  const talkerId = talker.filter((t) => t.id !== Number(id));
  talker.push(talkerId);
  fs.writeFileSync(talkerFile, JSON.stringify(talkerId));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
