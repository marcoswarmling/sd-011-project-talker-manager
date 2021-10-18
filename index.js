const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send({

  });
});

app.get('/talker/:id', (_request, response) => {
  const { id } = _request.params;
  const idNum = Number(id); // id vem como string e será comparada com inteiros   
  try {
    const talkerData = fs.readFileSync('./talker.json', 'utf8');
    const talkersJson = JSON.parse(talkerData);
    const talker = talkersJson.find((e) => e.id === idNum); // so recebe "===" , nao "=="
    if (talker) {
      response.status(HTTP_OK_STATUS).json(talker);
    }
    response.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return response.status(INTERNAL_SERVER_ERROR).json({ error });
  }
});

app.get('/talker', (_request, response) => {
  try {
    const talkerData = fs.readFileSync('./talker.json', 'utf8');
    const talkersJson = JSON.parse(talkerData);
    if (talkersJson === null) {
      return response.status(HTTP_OK_STATUS).json([]);
    }
    return response.status(HTTP_OK_STATUS).json(talkersJson);
  } catch (error) {
    return response.status(INTERNAL_SERVER_ERROR).json({ error });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
