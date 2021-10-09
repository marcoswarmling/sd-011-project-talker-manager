const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const getTalkers = require('./getTalker');
const getTalkerId = require('./getTalkerId'); 
const validations = require('./middleware/validations');
const newTalker = require('./postTalker');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funciona
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkers);
app.get('/talker/:id', getTalkerId);
app.post('/login', validations.checkEmail, validations.checkPassWord, validations.cryptoGenerate);
app.post('/talker',
  newTalker.authorizationToken,
  newTalker.checkName,
  newTalker.checkAge,
  newTalker.checkTalk,
  newTalker.checkWatchedAt,
  newTalker.checkRate,
  newTalker.createdTalker);

app.listen(PORT, () => {
  console.log('Online');
});
