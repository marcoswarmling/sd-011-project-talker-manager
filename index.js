const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// const crypto = require('crypto');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validationToken = require('./middlewares/validationToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateRate = require('./middlewares/validateRate');

const file = './talker.json';

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

app.get('/talker', async (_req, res) => {
  try {
  const talker = await fs.readFile(file, 'utf-8');
  res.status(HTTP_OK_STATUS).json(JSON.parse(talker));
} catch (err) {
  res.status(400).json({ message: err.message });
}
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await fs.readFile(file, 'utf-8');
    const dados = JSON.parse(talker).find((p) => p.id === Number(id));
    if (!dados) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(HTTP_OK_STATUS).json(dados);
} catch (err) {
  res.status(404).json({ message: err.message });
}
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
 // const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

app.post('/talker',
validationToken,
validateName, 
validateAge,
validateTalk,
validateWatchedAt,
validateRate,

async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const talker = await JSON.parse(fs.readFile(file, 'utf8'));

    const newTalker = { age, id: talker.length + 1, name, talk };
    talker.push(newTalker);

    await fs.writeFile(file, JSON.stringify(talker));
    res.status(201).json(newTalker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
