const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');
const { 
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
} = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerJsonFile = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// REQUISITO 7
app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;

  const talkerList = await fs.readFile(talkerJsonFile, 'utf-8');
  const newtalkerList = JSON.parse(talkerList);

  const filteredList = newtalkerList.filter((person) => person.name.includes(q));

  if (!q || q === '') return res.status(200).json(newtalkerList);
  if (!filteredList) return res.status(200).json([]);
  
  return res.status(200).json(filteredList);
});

// REQUISITO 1
app.get('/talker', async (_req, res) => {
  const data = await fs.readFile(talkerJsonFile, 'utf-8');
  const talkers = await JSON.parse(data);
  if (!talkers) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

// REQUISITO 2
app.get('/talker/:id', async (req, res) => {
  const data = await fs.readFile(talkerJsonFile, 'utf-8');
    const talkers = JSON.parse(data);
    const { id } = req.params;
    const talker = talkers.find((person) => person.id === Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talker);
});

// GET TOKEN
// function getToken() {
//   const base = '0123456789ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvwxyz';
//   const tokenLength = 16;
//   const token = [];
//   for (let i = 0; i < tokenLength; i += 1) {
//     const randomPosition = Math.floor(Math.random() * base.length + 1);
//     token.push(base.charAt(randomPosition));
//   }
//   token.join('');
//   return token;
// }

// O código abaixo foi sugerido por Bruna Campos. Segue repositório: https://github.com/tryber/sd-011-project-talker-manager/pull/10/files
const getToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

// REQUISITO 3
app.post(
  '/login',
  validateEmail,
  validatePassword, (_req, res) => { res.status(200).json({ token: getToken() }); },
);

// REQUISITO 4
app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
  async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  
  const talkerList = await fs.readFile(talkerJsonFile, 'utf-8');
  const talkerListJson = JSON.parse(talkerList);
  const id = talkerListJson.length + 1;
  
  const newTalker = { name, age, id, talk: { watchedAt, rate } };
  
  talkerListJson.push(newTalker);
  console.log(talkerListJson);
  const newTalkerList = JSON.stringify(talkerListJson);
  await fs.writeFile(talkerJsonFile, newTalkerList);

  return res.status(201).json(newTalker);
  },
);

// REQUISITO 5
app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,  
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkerList = await fs.readFile(talkerJsonFile, 'utf-8');
    const talkerListJson = JSON.parse(talkerList);
  
    const talkerIndex = talkerListJson.findIndex((talker) => talker.id === Number(id));
    talkerListJson[talkerIndex] = { 
      ...talkerListJson[talkerIndex], name, age, talk: { watchedAt, rate },
    };
    const newTalker = talkerListJson[talkerIndex];
    const talkerListStringfy = JSON.stringify(talkerListJson);
    await fs.writeFile(talkerJsonFile, talkerListStringfy);
  
    return res.status(200).json(newTalker);
});

// REQUISITO 6
app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const talkerList = await fs.readFile(talkerJsonFile, 'utf-8');
  const talkerListData = JSON.parse(talkerList);

  const talkerIndex = talkerListData.findIndex((person) => person.id === id);
  talkerListData.splice(talkerIndex, 1);
  
  const talkerListStringfy = JSON.stringify(talkerListData);
  await fs.writeFile(talkerJsonFile, talkerListStringfy);

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
