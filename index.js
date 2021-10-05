const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { 
  validEmail,
  validPassword,
  validAge,
  validName,
  validTalk,
  validToken,
  validWatchAt,
  validTalkRate } = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (_req, res) => {
  const response = JSON.parse(await fs.readFile('talker.json', 'utf8'));
  if (response.length < 1) return res.status(200).json([]);
  res.status(200).json(response);
});

app.get('/talker/:id', async (req, res) => {
  const response = JSON.parse(await fs.readFile('talker.json', 'utf8'));
  const findTalker = response.find(({ id }) => Number(id) === Number(req.params.id));
  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(findTalker);
});

app.post('/login', validEmail, validPassword,
  (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }));

app.post('/talker', validToken, validName, validAge, validTalk, validWatchAt, validTalkRate,
  async (req, res) => {
    const response = JSON.parse(await fs.readFile('talker.json', 'utf8'));
    const { name, age, talk } = req.body;
    const newTalker = {
      id: response.length + 1,
      name,
      age,
      talk,
    };
    response.push(newTalker);
    res.status(201).json(newTalker);
    fs.writeFile('talker.json', JSON.stringify(response));
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
