const express = require('express');
const bodyParser = require('body-parser');

const talkers = require('./allTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const getTalkers = talkers.getTalkers();
  res.status(HTTP_OK_STATUS).json(getTalkers);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const getTalkers = talkers.getTalkers();
  const talkerById = getTalkers
    .find((a) => a.id === Number(id));
    console.log(talkerById);
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkerById);
});

app.listen(PORT, () => {
  console.log('Online');
});
