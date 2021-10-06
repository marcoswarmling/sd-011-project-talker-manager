/* const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); */
const express = require('express');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

async function getTalkers() {
  const data = await fs.readFile('./talker.json');
  const dbTalkers = JSON.parse(data);
  return dbTalkers; 
}

/* app.get('/talker/:id', async (_req, res) => {
  
}); */

app.get('/talker', async (_req, res) => {
  const data = await getTalkers();
  if (data.length === 0) {
    res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/', (_request, response) => {
// não remova esse endpoint, e para o avaliador funcionar
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
