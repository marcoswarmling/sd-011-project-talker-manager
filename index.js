const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FIND_STATUS = 404;
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
const { findId } = require('./services/SearchById');

app.route('/talker').get(async (_request, response) => {
  const contentFromFile = await FileRead(paths.talker);

  if (contentFromFile) {
    return response.status(HTTP_OK_STATUS).json(contentFromFile);
  }

  response.status(200).json([]);
});

app.route('/talker/:id').get(async (request, response) => {
  const { id } = request.params;

  const talkersDatabase = await FileRead(paths.talker);
  const findedTalker = findId(talkersDatabase, id);

  if (findedTalker) {
    return response.status(HTTP_OK_STATUS).json(findedTalker);
  }

  return response
    .status(HTTP_NOT_FIND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' });
});
