const express = require('express');
const bodyParser = require('body-parser');

const data = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1 - GET com todos os talkers
app.get('/talker', (_req, res) => {
    res.status('200').json(data);
});

// Requisito2 - GET com endpoint /talker/:id
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = data.find((elem) => elem.id === parseInt(id, 10));
  if (!talker) {
    return res.status('400')
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status('400').json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
