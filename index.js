const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const { HTTP_OK_STATUS } = require('./httpStatusCode');

const FILE = './talker.json';

const app = express();
app.use(bodyParser.json());

// const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', async (_request, response) => {
  const data = await fs.readFile(FILE);
  const talkers = JSON.parse(data);
  response.status(HTTP_OK_STATUS).json(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
