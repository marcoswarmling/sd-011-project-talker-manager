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
  console.log('Porta disponivel');
});

const paths = {
  talker: './talker.json',
};

const { FileRead } = require('./services/FilesHandler');

app.route('/talker').get(async (_request, response) => {
  const contentFromFile = await FileRead(paths.talker);

  if (contentFromFile) {
    return response.status(200).json(contentFromFile);
  }

  response.status(200).json([]);
});
