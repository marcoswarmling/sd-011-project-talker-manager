const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (_req, res) => {
  try {
    const file = await fs.readFile('./talker.json', 'utf-8');
    res.status(HTTP_OK_STATUS).json(JSON.parse(file));
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const file = await fs.readFile('./talker.json', 'utf-8');
    const jsonFile = JSON.parse(file);

    const findId = jsonFile.find((s) => s.id === parseInt(id, 10));

    if (!findId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    res.status(HTTP_OK_STATUS).json(findId);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.post('/login',
validateEmail,
validatePassword,
(_req, res) => res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' }));

app.post('/talker',
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const file = await fs.readFile('./talker.json', 'utf-8');
  const jsonFile = JSON.parse(file);
  const lastEntry = jsonFile.length;
  const id = lastEntry + 1;
  const newSpeaker = { id, name, age, talk };

  jsonFile.push(newSpeaker);
  fs.writeFile('./talker.json', JSON.stringify(jsonFile));

  return res.status(201).json(newSpeaker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
