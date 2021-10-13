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

app.get('/talker', async (req, res) => {
  const returnedTalkers = await fs.readFile('./talker.json', 'utf-8');
  if (!returnedTalkers) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(JSON.parse(returnedTalkers));
});

app.get('/talker/:id', async (req, res) => {
  const returnedTalkers = await fs.readFile('./talker.json', 'utf-8');
  const talkersDB = JSON.parse(returnedTalkers);
  const { id } = req.params;
  const talkerId = talkersDB.find((talker) => talker.id === Number(id));
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talkerId);
});

app.listen(PORT, () => {
  console.log('Online');
});
