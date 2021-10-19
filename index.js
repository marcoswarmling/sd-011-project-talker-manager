const express = require('express');
const bodyParser = require('body-parser');
// const { response } = require('express');
const fs = require('fs').promises;
const { validateToken } = require('./middlewares/validateToken');
const { validateName } = require('./middlewares/validateName');
const { validateAge } = require('./middlewares/validateAge');
const { validateTalk } = require('./middlewares/validateTalk');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('talker.json', 'utf8').then((fileContent) => {
    if (!fileContent) res.status(HTTP_OK_STATUS).json([]);
    res.status(HTTP_OK_STATUS).json(JSON.parse(fileContent));
  }).catch((error) => {
    console.log(error);
  });
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  console.log(typeof id);
  const fileContent = await fs.readFile('talker.json', 'utf8');
  const fileContentParsed = JSON.parse(fileContent);
  console.log(typeof fileContentParsed[0].id);
  const talker = fileContentParsed.find((t) => t.id === parseInt(id, 2));
  if (!talker) res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  if (!password) res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  const regex = /\S+@\S+\.\S+/;
  const emailIsValid = regex.test(email);
  if (!emailIsValid) { 
    return res.status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) { 
    return res.status(BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

app.post('/talker', validateToken, validateName, validateAge, validateTalk, async (req, res) => {
  const data = await fs.readFile('talker.json', 'utf8');
  const fileContent = JSON.parse(data);
  const newId = fileContent.length + 1;
  const newTalker = { ...req.body, id: newId };
  fileContent.push(newTalker);
  fs.writeFile('talker.json', JSON.stringify(fileContent));
  res.status(CREATED).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
