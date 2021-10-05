const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs/promises');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (_request, response) => {
  const file = await fs.readFile('./talker.json', 'utf8');
  if (!file) return response.status(HTTP_OK_STATUS).json([]);
  response.status(HTTP_OK_STATUS).json(JSON.parse(file));
}));

app.use((err, _req, res, _next) => {
  res.status(500).json({ error: `Erro: ${err.message}` });
});

app.listen(PORT, () => {
  console.log('Online');
});
