const express = require('express');
const bodyParser = require('body-parser');
const { readFile, writeFile } = require('./data/accessFile');
const getToken = require('./util/tokenGenerate');
const authLogin = require('./middlewares/authLogin');
const authToken = require('./middlewares/authToken');
const authName = require('./middlewares/authName');
const authAge = require('./middlewares/authAge');
const authTalk = require('./middlewares/authTalk');
const authDoRage = require('./middlewares/authDoRage');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await readFile();
  res.status(200).send(data);
});

app.get('/talker/:id', async (req, res) => {
  const data = await readFile();
  const { id } = req.params;
  const talker = data.find((tal) => tal.id === parseInt(id, 10));

  const notFoundResponse = {
    message: 'Pessoa palestrante não encontrada',
  };  
  if (!talker) return res.status(404).json(notFoundResponse);

  res.status(200).json(talker);
});

app.post(
  '/talker', authToken, authName, authAge, authTalk, authDoRage,
  async (req, res) => {
    const data = await readFile();
    const id = data[data.length - 1].id + 1;
    req.body.id = id;
    data.push(req.body);
    await writeFile(data);
    res.status(201).json(req.body);
  },
);

app.post('/login', authLogin, (_req, res) => {
  res.status(200).json({
    token: getToken(16),
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
