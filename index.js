const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const loginRouter = require('./routers/loginRouter');
const talkerRouter = require('./routers/talkerRouter');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talker = await fs.readFile('./talker.json', 'utf-8');
  if (!talker) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(JSON.parse(talker));
});

app.get('/talker/:id', async (req, res) => {
  const talker = await fs.readFile('./talker.json', 'utf-8');
  const talkerParse = JSON.parse(talker);
  const { id } = req.params;
  const talkerId = talkerParse.find((t) => t.id === Number(id));

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkerId);
});

app.use('/', loginRouter);
app.use('/', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
