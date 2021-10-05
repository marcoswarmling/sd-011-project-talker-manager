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

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!/^\S+@\S+\.\S+$/.test(email)) { // expressão encontrada em https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

app.post('/login', validateLogin, (_req, res) => res.status(200).json(
  { token: '7mqaVRXJSp886CGr' },
));
