const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const readFilePromise = util.promisify(fs.readFile);

app.get('/talker', (_request, response) => {
  readFilePromise('talker.json')
    .then((content) => response.status(HTTP_OK_STATUS).json(JSON.parse(content)))
    .catch(() => response.status(HTTP_OK_STATUS).json([]));
});

app.listen(PORT, () => {
  console.log('Online');
});
