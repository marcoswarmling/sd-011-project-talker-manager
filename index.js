const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkerList = await fs.readFile('./talker.json', 'utf-8');
    return res.status(HTTP_OK_STATUS).json(JSON.parse(talkerList));
});

app.listen(PORT, () => {
  console.log('Online');
});
