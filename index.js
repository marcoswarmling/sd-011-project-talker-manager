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
  scanToken,
  registerTalker } = require('./src');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(router);

app.post('/login', login);

app.post('/talker', [
  scanToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  addTalker,
]);

app.put('/talker/:id', [
  scanToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  registerTalker,
]);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
