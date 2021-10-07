const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const token = require('./middleware/token');
const emailValid = require('./middleware/validationEmail');
const passwordValid = require('./middleware/validationPassword');
const tokenValid = require('./middleware/validationToken');
const nameValid = require('./middleware/validationName');
const ageValid = require('./middleware/validationAge');
const talkValid = require('./middleware/validationTalk');
const watchRateValid = require('./middleware/validationWatchRate');
// const newData = require('./middleware/newData');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const HTTP_OK_STATUS = 200;
const HTTP_TALKER_OK_STATUS = 201;
const PORT = '3000';
const URL = './talker.json';
// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// requisito 1

app.get('/talker', async (_request, response) => {
  try {
    const data = await fs.readFile(URL, 'utf-8');
    response.status(HTTP_OK_STATUS).json(JSON.parse(data));
  } catch (error) {
    response.status(400).json({ message: `Erro ${error.code}` });
  }
});

// requisito 2

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(URL, 'utf-8');
    const findData = await JSON.parse(data);
    const findId = findData.find((e) => e.id === parseInt(id, 10) && [e]);
    if (!findId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } 
    return res.status(HTTP_OK_STATUS).json(findId);
  } catch (error) {
    res.status(400).json({ message: `Erro: ${error.code}` });
  }
});

// requisito 3

app.post('/login', emailValid, passwordValid, token);

// requisito 4

app.post('/talker',
  tokenValid,
  nameValid,
  ageValid,
  talkValid,
  watchRateValid,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const fetch = await fs.readFile(URL, 'utf-8');
  const parseFetch = await JSON.parse(fetch);
  const obj = {
    id: parseFetch.length + 1,
    name,
    age: parseInt(age, 10),
    talk,
  };
  parseFetch.push(obj);
  await fs.writeFile(URL, JSON.stringify(parseFetch));

  return res.status(HTTP_TALKER_OK_STATUS).json(obj);
});

// requisito 5

app.put('/talker/:id',
  tokenValid,
  nameValid,
  ageValid,
  talkValid,
  watchRateValid,
  async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const data = await fs.readFile(URL, 'utf-8');
  const findData = await JSON.parse(data);
  const findIdex = findData.find((e) => e.id === parseInt(id, 10) && [e]);

  findData[findIdex] = { id: parseInt(id, 10), name, age: parseInt(age, 10), talk };
  const update = findData.map((e) => {
    if (e.id === parseInt(id, 10)) {
      return findData[findIdex];
    }
    return e;
  });
  
  await fs.writeFile(URL, JSON.stringify(update));

  return res.status(HTTP_OK_STATUS).json(findData[findIdex]);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
