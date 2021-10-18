const express = require('express');
const bodyParser = require('body-parser');
// const { response } = require('express');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('talker.json', 'utf8').then((fileContent) => {
    if (!fileContent) res.status(HTTP_OK_STATUS).json([]);
    res.status(HTTP_OK_STATUS).json(JSON.parse(fileContent));
  }).catch((error) => {
    console.log(error);
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
