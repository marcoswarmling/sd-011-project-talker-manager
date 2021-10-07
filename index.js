const express = require('express');
const bodyParser = require('body-parser');

const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const list = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1 - GET com todos os talkers
app.get('/talker', async (_req, res) => {
  readFile('./talker.json', 'utf8').then((data) => {
      res.status('200').json(JSON.parse(data));
  });
});

// Requisito2 - GET com endpoint /talker/:id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await list.find((e) => e.id === parseInt(id, 10));
  if (!talker) {
    return res.status('400')
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status('400').json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
