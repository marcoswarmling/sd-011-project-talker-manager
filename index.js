const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const fechAPI = './talker.json';

// Requisito 1

app.get('/talker', (_req, res) => {
  const data = JSON.parse(fs.readFileSync(fechAPI, 'utf-8'));

  if (!data) {
    return res.status(200).json([]);
  }

  res.status(200).json(data);
});

// Requisito 2

app.get('/talker/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(fechAPI, 'utf-8'));

  const { id } = req.params;

  const dataFind = data.find((item) => item.id === Number(id));
  
  if (!dataFind) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(dataFind);
});

app.listen(PORT, () => {
  console.log('Online');
});
