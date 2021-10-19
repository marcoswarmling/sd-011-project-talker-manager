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

const TALKER_JSON = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(TALKER_JSON, 'utf8').then((fileContent) => {
    if (!fileContent) res.status(HTTP_OK_STATUS).json([]);
    res.status(HTTP_OK_STATUS).json(JSON.parse(fileContent));
  }).catch((error) => {
    console.log(error);
  });
});

app.get('/talker/search', validateToken, async (req, res) => {
  try {
    const { q } = req.query;
    const data = await fs.readFile(TALKER_JSON, 'utf8');
    const fileContent = JSON.parse(data);
    if (!q) {
        if (!fileContent) res.status(HTTP_OK_STATUS).json([]);
        return res.status(HTTP_OK_STATUS).json(fileContent);
      }
    const filteredTalkers = fileContent.filter((t) => t.name.includes(q));
    res.status(HTTP_OK_STATUS).json(filteredTalkers);
  } catch (error) {
    console.log(error);
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fileContent = await fs.readFile('talker.json', 'utf8');
    const fileContentParsed = JSON.parse(fileContent);
    console.log(typeof fileContentParsed[0].id);
    const talker = fileContentParsed.find((t) => t.id === parseInt(id, 2));
    if (!talker) res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    console.log(error);
  }
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
  try {
    const data = await fs.readFile(TALKER_JSON, 'utf8');
    const fileContent = JSON.parse(data);
    const newId = fileContent.length + 1;
    const newTalker = { ...req.body, id: newId };
    fileContent.push(newTalker);
    await fs.writeFile(TALKER_JSON, JSON.stringify(fileContent));
    res.status(CREATED).json(newTalker);
  } catch (error) {
    console.log(error);
  }
});

app.put('/talker/:id', validateToken, validateName, validateAge, validateTalk, async (req, res) => {
  try {
    const { id } = req.params;
    const idInt = parseInt(id, 10);
    const data = await fs.readFile(TALKER_JSON, 'utf8');
    const fileContent = JSON.parse(data);
    const index = fileContent.findIndex((talker) => talker.id === idInt);
    const newTalker = { ...req.body, id: idInt };
    fileContent[index] = newTalker;
    await fs.writeFile(TALKER_JSON, JSON.stringify(fileContent));
    res.status(HTTP_OK_STATUS).json(newTalker);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const idInt = parseInt(id, 10);
    const data = await fs.readFile('talker.json', 'utf8');
    const fileContent = JSON.parse(data);
    const index = fileContent.findIndex((talker) => talker.id === idInt);
    fileContent.splice(index, 1);
    await fs.writeFile(TALKER_JSON, JSON.stringify(fileContent));
    res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    console.log(error); 
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
