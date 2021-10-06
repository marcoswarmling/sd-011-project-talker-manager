const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const userRouter = require('./routers/useRouter');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// requisito 1
app.get('/talker', async (_req, res) => {
  const talker = await fs.readFile('./talker.json', 'utf8');
  if (!talker) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(JSON.parse(talker));
});

// requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile('./talker.json', 'utf8');
  const jsonData = JSON.parse(talker);
  const data = jsonData.find((item) => item.id === Number(id));
  if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(data);
});

app.use('/', userRouter);

app.listen(PORT, () => {
  console.log('Online');
});
