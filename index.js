const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

// Importando funções acessórias:
const fsUtils = require('./fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// ----------------- Requisito 1: Criando endpoint /talker:
app.get('/talker', rescue(async (_request, response) => {
  const talker = await fsUtils.getTalkers();
  response.status(HTTP_OK_STATUS).json(talker);
}));

app.listen(PORT, () => {
  console.log('Online');
});
