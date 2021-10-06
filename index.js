const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const rescue = require('express-rescue');

const functionsAsync = require('./functionAsync');
const { validateEmail, validatePassword, generatorToken, validateToken, validateName, 
validateAge, validateDate, validateTalk, validateRate, validateWatched } = require('./validate');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', 
rescue(async (_req, res) => {
  const read = await functionsAsync.getReadFile();
  if (!read) return res.status(200).json([]);
  res.status(200).json(read);
  }));

  app.get('/talker/:id', rescue(async (req, res) => {
    const { id } = req.params;
    const sync = await functionsAsync.getReadFile();
    const filter = sync.find((i) => i.id === parseInt(id, 10));
    if (!filter) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(filter);
  }));

  app.post('/login', validateEmail, validatePassword, (_req, res) => {
    const token = generatorToken();
    res.status(200).json({ token });
  });

  app.post('/talker', validateToken, 
  validateName, 
  validateAge, 
  validateTalk,
  validateWatched, 
  validateDate,
  validateRate, rescue(async (req, res) => { 
    const { name, age, talk } = req.body;
    const newpersons = await functionsAsync.getReadFile();
    const newId = newpersons.length + 1;
    const person = { id: newId, name, age, talk };
    newpersons.push(person);
    await functionsAsync.setWriteFile(newpersons);
    res.status(201).json(person);
  }));

app.listen(PORT, () => {
  console.log('Online');
});
