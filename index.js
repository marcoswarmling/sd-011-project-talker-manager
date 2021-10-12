const express = require('express');
const bodyParser = require('body-parser');
const { readContentTalker } = require('./helpers/readFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// requisito 1 feito com base nos exercicios do course - express middlewares
app.get('/talker', async (_req, res) => {
  const dataTalker = await readContentTalker('./talker.json') || [];
  res.status(200).json(dataTalker);
});

// buscando pelo id
// app.get('talker/:id', (req, res) => {
//   const dataTalkerId = fs.readFileSync('./talker.json', 'utf-8');
//   const { id } = req.params;
//   const talkerId = JSON.parse(dataTalkerId);
//   const talkers = dataTalkerId.find((item) => item.id === Number(id));
//   if (!talkers) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
//   res.status(200).json(talkerId);
// });

app.get('talker/:id', async (req, res) => {
  const { id } = req.params;
  const dataTalkerId = await readContentTalker('./talker.json');
  const talkers = dataTalkerId.find((item) => item.id === Number(id));
  if (!talkers) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
