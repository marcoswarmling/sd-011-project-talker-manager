const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const INTERNAL_SERVER_ERROR = 500;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send({
    messenger: 'helloWorld',
  });
});

app.get('/talker', (_request, response) => {
  try {
    const talkerData = fs.readFileSync('./talker.json', 'utf8');
    const talkerFilter = JSON.parse(talkerData);
    return response.status(HTTP_OK_STATUS).json(talkerFilter);
  } catch (error) {
    return response.status(INTERNAL_SERVER_ERROR).json({ error });
  }
});

app.listen(PORT, () => {
  const talkerData = fs.readFileSync('./talker.json', 'utf8');
  console.log('Online');
  console.log(talkerData);
});
