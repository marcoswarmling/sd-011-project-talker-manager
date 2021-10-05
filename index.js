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

app.get('/talker', (req, res) => {
  fs.readFile('talker.json', 'utf8')
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log(err));
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('talker.json', 'utf8')
    .then((data) => data.json())
    .then((response) => response.find((e) => e.id === parseInt(id, 10)))
    .then((talker) => res.status(200).send(talker))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log('Online');
});
