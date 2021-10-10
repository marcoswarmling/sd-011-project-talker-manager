const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const { checkEmail, checkPassword } = require('./helper/validation');
const {
  checkToken, 
  checkName, 
  checkAge, 
  checkTalk, 
  checkDateFormat,
  checkRate,
} = require('./middlewares/validationUser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const fechAPI = './talker.json';

// Requisito 1

app.get('/talker', (_req, res) => {
  const data = JSON.parse(fs.readFileSync(fechAPI, 'utf-8'));

  if (!data) {
    return res.status(200).json([]);
  }

  res.status(200).json(data);
});

// Requisito 2

app.get('/talker/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(fechAPI, 'utf-8'));

  const { id } = req.params;

  const dataFind = data.find((item) => item.id === Number(id));
  
  if (!dataFind) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
   return res.status(200).json(dataFind);
});

// Requisito 3 

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!checkPassword(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

// Requisito 4

app.post('/talker', 
checkToken, 
checkName, 
checkAge, 
checkTalk, 
checkDateFormat,
checkRate,

(req, res) => {
  const { name, age, talk } = req.body;
  const data = JSON.parse(fs.readFileSync(fechAPI, 'utf-8'));
  const idPush = data[data.length - 1].id + 1;
  const newItem = { id: idPush, name, age, talk };

  data.push(newItem);
  fs.writeFileSync(fechAPI, JSON.stringify(data));
  return res.status(201).json(newItem);
});

// Requisito 5

app.put('/talker/:id', 
checkToken, 
checkName, 
checkAge, 
checkTalk, 
checkDateFormat,
checkRate,

 (req, res) => {
   const { id } = req.params;
   const { name, age, talk } = req.body;

   const data = JSON.parse(fs.readFileSync(fechAPI, 'utf-8'));
   const dataIndex = data.findIndex((item) => item.id === Number(id));
   const person = { name, age, talk, id: Number(id) };

   if (dataIndex === -1) return res.status(404).json({ message: 'Pessoa não encontrada' });
   data[dataIndex] = person;

   fs.writeFileSync(fechAPI, JSON.stringify(data));
   return res.status(200).json(person);
 });

// Requisito 6

app.delete('/talker/:id', checkToken, (req, res) => {
   const { id } = req.params;

    const data = JSON.parse(fs.readFileSync(fechAPI, 'utf-8'));
    const dataFind = data.findIndex((item) => item.id === Number(id));
    data.splice(dataFind, 1);

  fs.writeFileSync(fechAPI, JSON.stringify(dataFind));
   return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
 });

// Requisito 7

app.get('/talker/search', checkToken, (req, res) => {
  const { q } = req.query;

   const data = JSON.parse(fs.readFileSync(fechAPI, 'utf-8'));
   const dataFiltered = data.filter((item) => item.name.includes(q));
   if (!q) return res.status(200).json([]);

   if (dataFiltered.length === 0) return res.status(200).json(data);
   return res.status(200).json(dataFiltered);
});

app.listen(PORT, () => {
 console.log('Online'); 
});
