const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const { id } = req.params;
  const findTalkersById = talkers.find((talker) => talker.id === parseInt(id, 10));
  if (!findTalkersById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(findTalkersById);
});

app.listen(PORT, () => {
  console.log('Online');
});
