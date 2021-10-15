const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalker,
  getId,
  login,
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationDate,
  validationRate,
  postTalker,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalker);
app.get('/talker/:id', getId);
app.post('/login', login);

const validations = [
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationDate,
  validationRate,
];

app.post('/talker', [validations, postTalker]);

app.listen(PORT, () => {
  console.log('Online');
});
