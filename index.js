const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers, readTalkerById,
  validateEmailAndPassword, giveToken } = require('./middlewares/middlewares');
const { validateName, validateToken, validateAge, validateTalk, validateWatchedAt,
   validateRate, createTalks, editTalker } = require('./middlewares/validateBody');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', readTalkers);

app.get('/talker/:id', readTalkerById);

app.post('/login', validateEmailAndPassword, giveToken);

app.post('/talker', validateToken, validateName, validateAge,
  validateTalk, validateRate, validateWatchedAt, createTalks);

app.put('/talker/:id', validateToken, validateName, validateAge,
validateTalk, validateRate, validateWatchedAt, editTalker);
