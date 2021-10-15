const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Estamos aqui');
});

const paths = {
  talker: './talker.json',
  tokens: './tokens.json',
};

const { FileRead } = require('./services/FilesHandler');

app.get('/talker', async (_request, response) => {
  const contentFromFile = await FileRead(paths.talker);

  if (contentFromFile) return response.status(HTTP_OK_STATUS).json(contentFromFile);

  return response.status(HTTP_OK_STATUS).json([]);
});
