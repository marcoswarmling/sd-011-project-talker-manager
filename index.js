const express = require('express');
const bodyParser = require('body-parser');

const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1 - GET com todos os talkers
app.get('/talkers', async (_req, res) => {
  readFile('./talker.json', 'utf8').then((data) => {
      res.status('200').json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
