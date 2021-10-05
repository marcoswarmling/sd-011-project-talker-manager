const express = require('express');
const fs = require('fs');
// const { talkerValidator } = require('./validations');
const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await fs.readFileSync('./talker.json');
  const talker = JSON.parse(data);
  if (talker.length === 0) {
    res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).send(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
