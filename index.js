const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const { validateEmail, validatePassword,
  validateToken, validateName,
  validateAge, validateTalk } = require('./middlewares/validations');

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
    if (!q) res.status(200).json(file);
    const filteredNamesByQuery = file.filter((p) => p.name.includes(q));
    console.log(filteredNamesByQuery);
    res.status(200).json(filteredNamesByQuery);
});

app.get('/talker/:id', (req, res) => {
  console.log('Rota delete');
  const { id } = req.params;
  const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  const person = file.filter((p) => p.id === parseInt(id, 10));
  if (person.length === 0) {
    res.status(404).json({ 
      message: 'Pessoa palestrante não encontrada',
  });
}
  res.status(200).json(person);
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
  (req, res) => { 
  const { name, age, talk } = req.body;
  const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  const newPerson = { id: file.length + 1, name, age, talk };
  fs.writeFileSync(fileName, file.push(newPerson));
  res.status(201).json(newPerson);
});

// app.put();

app.delete('/talker/:id',
  validateToken,
  (req, res) => {
    const { id } = req.params;
    const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    const person = file.findIndex((p) => p.id === parseInt(id, 10));
    fs.writeFileSync(fileName, file.splice(person, 1));
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' }).end();
});

app.get('/talker', (_req, res) => {
  const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  res.status(200).json(file);
});

app.listen(PORT, () => {
  console.log('Online');
});
