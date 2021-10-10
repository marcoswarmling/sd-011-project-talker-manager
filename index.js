const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const fs = require('fs/promises');

app.get('/talker', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');

  res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
});
