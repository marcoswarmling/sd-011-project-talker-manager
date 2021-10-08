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
  console.log(`o ${id}, é um ${typeof id}`);
  const newArray = array.filter((talk) => talk.id !== Number(id));
  await setTalkers(newArray);
  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.get('/talker/search?q=searchTerm', (req, res) => {
  console.log(req.query);
  res.status(500).send('ta aqui');
});
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
