const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 1

app.get('/talker', async (_req, res) => {
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
    return res.status(HTTP_OK_STATUS).json(JSON.parse(talkerList));
});

// 2

app.get('/talker/:id', async (req, res) => {
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
  const { id } = req.params;
  const talker = JSON.parse(talkerList).find((t) => t.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
