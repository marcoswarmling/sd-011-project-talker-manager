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
  return res.status(HTTP_OK_STATUS).json(JSON.parse(talker));
} catch (err) {
  return res.status(400).json({ message: err.message });
}
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await fs.readFile(file, 'utf-8');
    const dados = JSON.parse(talker).find((p) => p.id === Number(id));
    if (!dados) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(dados);
} catch (err) {
  return res.status(404).json({ message: err.message });
}
});

app.post('/login', validateEmail, validatePassword, (_req, res) => 
 // const token = crypto.randomBytes(8).toString('hex');
   res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' }));

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

    const talker = JSON.parse(await fs.readFile(file, 'utf-8'));

    const newTalker = { age, id: talker.length + 1, name, talk };
    talker.push(newTalker);

    await fs.writeFile(file, JSON.stringify(talker));
    return res.status(201).json(newTalker);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.put('/talker/:id',
validationToken,
validateName, 
validateAge,
validateTalk,
validateWatchedAt,
validateRate,

async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  try {
    const talker = JSON.parse(await fs.readFile(file, 'utf-8'));
    const talkerIndex = talker.findIndex((talkerID) => talkerID.id === Number(id));
    const person = { name, age, talk, id: Number(id) };
    if (talkerIndex === -1) return res.status(404).json({ message: 'Pessoa não encontrada' });
    talker[talkerIndex] = person;
    await fs.writeFile(file, JSON.stringify(talker));
    return res.status(HTTP_OK_STATUS).json(person);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.delete('/talker/:id',
validationToken,

async (req, res) => {
  const { id } = req.params;
  try {
    const talker = JSON.parse(await fs.readFile(file, 'utf-8'));
    const talkerFind = talker.find((talkerID) => talkerID.id === Number(id));
    talker.splice(talkerFind, 1);

    await fs.writeFile(file, JSON.stringify(talkerFind));
    return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
