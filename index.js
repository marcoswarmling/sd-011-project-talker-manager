const express = require('express');
const bodyParser = require('body-parser');
const fsAsync = require('fs').promises;
const crypto = require('crypto');
const validations = require('./validations');

const { checkToken, checkLogin, checkName, checkAge, checkTalk, checkTalkKeys } = validations;

const app = express();
app.use(bodyParser.json());

const listTalkers = './talker.json';

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 7°
app.get('/talker/search',
  checkToken, async (req, res) => {
  const { q } = req.query;
  const talkersArr = JSON.parse(await fsAsync.readFile(listTalkers, 'utf8'));
  const onSearchProfiles = talkersArr
  .filter((talker) => talker.name.toLocaleLowerCase().includes(q.toLocaleLowerCase()));
  if (!q || q === '') res.status(200).json(talkersArr);
  res.status(200).json(onSearchProfiles);
});

// 1°
app.get('/talker', (_req, res) => {
  fsAsync.readFile(listTalkers, 'utf8')
  .then((data) => { res.status(HTTP_OK_STATUS).json(JSON.parse(data)); })
  .catch(() => { res.status(HTTP_OK_STATUS).json(JSON.parse([])); });
});

// 2°
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerFind = await fsAsync.readFile(listTalkers, 'utf8')
  .then((response) => JSON.parse(response).find((talker) => talker.id === parseInt(id, 10)));
  if (!talkerFind) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerFind);
});

// 3°
app.post('/login', checkLogin, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token });
});

// 4°
app.post('/talker',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkTalkKeys, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkersArr = JSON.parse(await fsAsync.readFile(listTalkers, 'utf8'));
  const availableId = talkersArr.length + 1;
  const newTalker = { name, age, id: availableId, talk };
  talkersArr.push(newTalker);
  res.status(201).json(newTalker);
  await fsAsync.writeFile(listTalkers, JSON.stringify(talkersArr));
});

// 5°
app.put('/talker/:id',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkTalkKeys, async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkersArr = JSON.parse(await fsAsync.readFile(listTalkers, 'utf8'));
  const onChangeProfileIndex = talkersArr.findIndex((talker) => Number(talker.id) === Number(id));
  const changesOnDemand = { name, age, id: Number(id), talk };
  talkersArr[onChangeProfileIndex] = changesOnDemand;
  await fsAsync.writeFile(listTalkers, JSON.stringify(talkersArr));
  res.status(200).json(changesOnDemand);
});

// 6°
app.delete('/talker/:id',
  checkToken, async (req, res) => {
  const { id } = req.params;
  const talkersArr = JSON.parse(await fsAsync.readFile(listTalkers, 'utf8'));
  const onChangeProfileIndex = talkersArr.findIndex((talker) => Number(talker.id) === Number(id));
  talkersArr.splice(onChangeProfileIndex, 1);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  fsAsync.writeFile(listTalkers, JSON.stringify(talkersArr));
});

app.listen(PORT, () => {
  console.log('Online');
});
