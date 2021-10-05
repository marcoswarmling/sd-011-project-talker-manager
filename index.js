const express = require('express');
const bodyParser = require('body-parser');
const { talkersList } = require('./challenges/talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// ! =============================== Inicio Desafios ===================================

// ? ================================= Desafios 1 ======================================

app.get('/talker', (_req, res) => {
  const talker = talkersList();
  res.status(200).json(talker);
});

// ? ================================= Desafios 2 ======================================

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = talkersList();

  const chooseTalker = talker.find((e) => e.id === Number(id));

  if (!chooseTalker) {
    return res.status(404)
    .json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(chooseTalker);
});

// ! ================================= Fim Desafios ====================================

app.listen(PORT, () => {
  console.log('Online');
});
