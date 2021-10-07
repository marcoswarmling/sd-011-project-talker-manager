const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/talker.js');
const { login, 
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  addTalker, 
  readToken,
  registerTalker,
  deleteTalker } = require('./src');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(router);

app.post('/login', login);

app.post('/talker', [
  readToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  addTalker,
]);

app.put('/talker/:id', [
  readToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  registerTalker,
]);

app.delete('/talker/:id', [readToken, deleteTalker]);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
