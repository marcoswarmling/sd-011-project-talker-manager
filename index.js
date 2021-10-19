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

// Requisito 1
// app.get('/talker', async (req, res) => {
//   const content = await fs.readFile('/talker.json', 'utf-8');
//   if (!content) return res.status(200).json([]);
//   res.status(200).json(JSON.parse(content));
// });

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const content = await fs.readFile('./talker.json', 'utf-8');
  const contentParse = JSON.parse(content);
  const { id } = req.params;

  const getId = contentParse.find((o) => o.id === Number(id));
  if (!getId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(getId);
});

app.listen(PORT, () => {
  console.log('Online');
});