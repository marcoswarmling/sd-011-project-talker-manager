const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const { makeid, validateEmail, validatePassword } = require('./checkInFunctions');
const { 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalk2,
  setTalkers,
} = require('./addTalkerFunctions');

async function readTalker() {
  const talker = await fs.readFile('./talker.json');
  return JSON.parse(talker);
}

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  const talker = await readTalker();
  res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const array = await readTalker();
  if (!q) return res.status(HTTP_OK_STATUS).send(array);
  const newArray = array.filter((obj) => obj.name.includes(q));
  res.status(HTTP_OK_STATUS).send(newArray);
});

app.get('/talker/:id', async (req, res) => {
  const talker = await readTalker();
  const { id } = req.params;
  const resultado = await talker.find((obj) => obj.id === Number(id));
  if (resultado === undefined) {
    return res.status(404).send({ 
      message: 'Pessoa palestrante não encontrada', 
    }); 
  }
  res.status(HTTP_OK_STATUS).send(resultado);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = makeid();
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validateToken, validateName, validateAge,
validateTalk, validateTalk2, rescue(async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readTalker();
  const newTalker = {
     id: talkers.length + 1, name, age, talk, 
  };
  await talkers.push(newTalker);
  await setTalkers(talkers);
  res.status(201).json(newTalker);
}));

app.delete('/talker/:id', validateToken, async (req, res) => {
  const array = await readTalker();
  const { id } = req.params;
  const newArray = array.filter((talk) => talk.id !== Number(id));
  await setTalkers(newArray);
  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.put('/talker/:id', validateToken, validateName,
validateAge, validateTalk, validateTalk2, async (req, res) => {
  const array = await readTalker();
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const newArray = array.map((talker) => {
    if (talker.id === Number(id)) {
      return {
        id: Number(id), name, age, talk,
      };
    }
    return talker;
  });
  await setTalkers(newArray);
  res.status(HTTP_OK_STATUS).json({
    id: Number(id), name, age, talk,
  });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
