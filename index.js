const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const talker = 'talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (_request, response) => {
  const data = JSON.parse(fs.readFileSync(talker, 'utf8'));
  if (data.length === 0) return response.status(HTTP_OK_STATUS).json([]);
  response.status(HTTP_OK_STATUS).send(data);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const data = JSON.parse(fs.readFileSync(talker));
  const talkerById = data.find((talkId) => talkId.id === Number(id));
  if (!talkerById) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(talkerById);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
