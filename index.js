const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promisses;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const fetchData = await JSON.parse(data);

  res.status(HTTP_OK_STATUS).json(fetchData);
});

app.post('/talker');

app.listen(PORT, () => {
  console.log('Online');
});
