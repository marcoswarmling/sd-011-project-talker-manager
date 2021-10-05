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

app.listen(PORT, () => {
  console.log('Online');
});

async function readOneFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const dataNotString = JSON.parse(data);
    return dataNotString;
  } catch (error) {
    console.log(error);
  }
}

app.get('/talker', async (_req, res) => {
  const talkers = await readOneFile('./talker.json');
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readOneFile('./talker.json');
  const { id } = req.params;
  const filteredTalker = talkers.find((talker) => Number(talker.id) === Number(id));
  if (!filteredTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(filteredTalker);
});