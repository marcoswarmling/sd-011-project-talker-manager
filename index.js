const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  if (!talkers) { res.status(HTTP_OK_STATUS).json([]); }
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
