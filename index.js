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

// 1 - Crie o endpoint GET /talker
app.get('/talker', (req, res) => {
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

  // Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o status 200.
  if (data.length === 0) return res.status(200).json([]);

  // O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas.
    res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log('Online');
});
