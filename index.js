const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (_req, res) => {
  const response = JSON.parse(await fs.readFile('talker.json', 'utf8'));
  if (response.length < 1) return res.status(200).json([]);
  res.status(200).json(response);
});

app.get('/talker/:id', async (req, res) => {
  const response = JSON.parse(await fs.readFile('talker.json', 'utf8'));
  const findTalker = response.find(({ id }) => Number(id) === Number(req.params.id));
  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(findTalker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
