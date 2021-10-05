const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('./data/accessFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await readFile();
  // if(data.length === 0) return res.status(200)
  res.status(200).send(data);
});

app.get('/talker/:id', async (req, res) => {
  const data = await readFile();
  const { id } = req.params;
  const talker = data.find((tal) => tal.id === parseInt(id, 10));

  const notFoundResponse = {
    message: 'Pessoa palestrante não encontrada',
  };  
  if (!talker) return res.status(404).json(notFoundResponse);

  res.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
