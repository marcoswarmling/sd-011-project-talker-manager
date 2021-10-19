const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const { validateEmail, validatePassword,
  validateToken, validateName,
  validateAge, validateTalk, validateTalkItems } = require('./middlewares/validations');

const fileName = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search',
  validateToken,
  (req, res) => {
    const { q } = req.query;
    const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    const filteredNamesByQuery = file
      .filter((p) => p.name.toLocaleLowerCase().includes(q.toLocaleLowerCase()));
    if (!q || q === '') return res.status(200).json(file);
    res.status(200).json(filteredNamesByQuery);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  const person = file.filter((p) => p.id === parseInt(id, 10));
  if (person.length === 0) {
    return res.status(404).json({ 
      message: 'Pessoa palestrante não encontrada',
  });
}
  res.status(200).json(person[0]);
});

app.post('/login',
  validateEmail,
  validatePassword,
  (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    
    res.status(200).json({ token });
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkItems,
  (req, res) => { 
  const { name, age, talk } = req.body;
  const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  const newPerson = { id: file.length + 1, name, age, talk };
  file.push(newPerson);
  fs.writeFileSync(fileName, JSON.stringify(file));
  return res.status(201).json(newPerson);
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkItems,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    const person = file.findIndex((p) => p.id === parseInt(id, 10));
    const updatedTalker = { name, age, id: Number(id), talk };
    file[person] = updatedTalker;
    fs.writeFileSync(fileName, JSON.stringify(file));
    return res.status(200).json(file[person]);
  });

app.delete('/talker/:id',
  validateToken,
  (req, res) => {
    const { id } = req.params;
    const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    const person = file.findIndex((p) => p.id === parseInt(id, 10));
    file.splice(person, 1);
    fs.writeFileSync(fileName, JSON.stringify(file));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' }).end();
});

app.get('/talker', (_req, res) => {
  const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  res.status(200).json(file);
});

app.listen(PORT, () => {
  console.log('Online');
});
