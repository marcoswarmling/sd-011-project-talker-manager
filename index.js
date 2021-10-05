const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const messages = 'Pessoa palestrante não encontrada';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const response = await fs.readFile('./talker.json', 'utf8');
    if (!response) return res.status(HTTP_OK_STATUS).json([]);

    res.status(HTTP_OK_STATUS).json(JSON.parse(response));
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const talker = await fs.readFile('./talker.json', 'utf8');
    const result = JSON.parse(talker);
    const response = result.find((value) => value.id === Number(id));

    if (!response) return res.status(404).json({ message: messages });

    res.status(HTTP_OK_STATUS).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
