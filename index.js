const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// fs.readFile('./talker.json', (err, content) => {
//   if(err) {
//     console.log(`Erro ao ler o arquivo: ${err.message}`);
//     return;
//   }
//   let contentFile = content.toString('utf8');
//   talkers = JSON.parse(contentFile);
// });

function getTalkers() {
  try {
    const data = fs.readFileSync('./talker.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(`Erro ao ler o arquivo: ${err}`);
  }
}

function getLastId() {
  const talkers = getTalkers();
  const lastElement = talkers[talkers.length - 1];
  return lastElement.id;
}

function updateTalker(id, newTalker) {
  const currentTalkers = getTalkers();
  const talker = currentTalkers.find((t) => t.id === id);
  talker.name = newTalker.name;
  talker.age = newTalker.age;
  talker.talk.watchedAt = newTalker.talk.watchedAt;
  talker.talk.rate = newTalker.talk.rate;
  try {
    fs.writeFileSync('./talker.json', JSON.stringify(currentTalkers));
  } catch (err) {
    console.log(`Erro ao inserir no arquivo: ${err}`);
  }
}

function deleteTalker(id){
  const currentTalkers = getTalkers();
  let newTalkers = [];
  for(let i = 0; i < currentTalkers; i+=1) {
    if(currentTalkers[i].id !== id){
      newTalkers.push(currentTalkers[i])
    }
  }
  try {
    fs.writeFileSync('./talker.json', JSON.stringify(newTalkers));
  } catch (err) {
    console.log(`Erro ao inserir no arquivo: ${err}`);
  }
}

function insertTalker(newTalker) {
  let currentTalkers = getTalkers();
  currentTalkers = [...currentTalkers, newTalker];
  const response = JSON.stringify(currentTalkers);
  try {
    fs.writeFileSync('./talker.json', response);
  } catch (err) {
    console.log(`Erro ao inserir no arquivo: ${err}`);
  }
}

function isEmailValid(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function isDateValid(date) {
  const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  return regex.test(date);
}

function generateToken(length) {
  const possibleChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const response = [];
  for (let i = 0; i < length; i += 1) {
    const randomNumber = (Math.random() * (possibleChars.length - 1)).toFixed(0);
    const randomChar = possibleChars[randomNumber];
    response.push(randomChar);
  }
  return response.join('');
}

app.get('/talker', (req, res) => {
  const talkers = getTalkers();
  res.status(200).json(talkers);
});

app.get('/talker/:id', (req, res) => {
  const talkers = getTalkers();
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isEmailValid(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({
    token: generateToken(16),
  });
});

app.post('/talker', function (req, res){
  const { name, age, talk } = req.body;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length <= 2) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (typeof age !== 'number' || !age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  if (!talk || !talk.rate || !talk.watchedAt) {
    return res.status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
      });
  }
  if (!isDateValid(talk.watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (typeof talk.rate !== 'number' || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  const newTalker = { id: getLastId() + 1, name, age, talk };
  insertTalker(newTalker);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', function (req, res){
  const newTalker = req.body;
  const { name, age, talk } = newTalker;
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length <= 2) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (typeof age !== 'number' || !age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  if (!talk || talk.rate === undefined || !talk.watchedAt) {
    return res.status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' 
      });
  }
  if (!isDateValid(talk.watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (typeof talk.rate !== 'number' || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  const idNumber = parseInt(id, 10);
  updateTalker(idNumber, newTalker);
  res.status(200).json({ id: idNumber, ...newTalker });
});

app.delete('/talker/:id', (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  const idNumber = parseInt(id, 10);
  deleteTalker(idNumber);
  res.status(200).json({ "message": "Pessoa palestrante deletada com sucesso" })
});