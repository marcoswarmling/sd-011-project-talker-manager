const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkers = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// d1
app.get('/talker', (_req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(talkers, 'utf-8'));
    return res.status(HTTP_OK_STATUS).json(data);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});
