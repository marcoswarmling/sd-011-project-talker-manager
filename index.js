const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const fs = require('fs');

app.get('/talker', async (_req, res) => {
  try {
    const dados = await fs.readFile('./talker.json', 'utf-8');
    res.status(HTTP_OK_STATUS).json(dados);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
