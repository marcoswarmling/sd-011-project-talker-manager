const express = require('express');
const bodyParser = require('body-parser');

const talkers = require('./allTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const getTalkers = talkers.getTalkers();
  res.status(HTTP_OK_STATUS).json(getTalkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
