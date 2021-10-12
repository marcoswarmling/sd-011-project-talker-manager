const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (_req, res) => {
  try {
    const file = await fs.readFile('./talker.json', 'utf-8');
    res.status(HTTP_OK_STATUS).json(JSON.parse(file));
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
