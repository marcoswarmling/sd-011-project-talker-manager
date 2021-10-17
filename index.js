const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const talkers = './talker.json';
const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 500;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  try {
    const data = fs.readFileSync(talkers, 'utf8');
    const talker = JSON.parse(data);
    return response.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    return response.status(HTTP_ERROR_STATUS).json(error);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
