const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const validationTokenMiddleware = require('./validate-token-middleware');

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

function deleteTalker(id) {
  const currentTalkers = getTalkers();
  const newTalkers = [];
  for (let i = 0; i < currentTalkers; i += 1) {
    if (currentTalkers[i].id !== id) {
      newTalkers.push(currentTalkers[i]);
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

function isDateValid(date) {
  const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  return regex.test(date);
}

function validateName(name) {
  if (!name) {
    return { message: 'O campo "name" é obrigatório', isValid: false };
  }
  if (name.length <= 2) {
    return { message: 'O "name" deve ter pelo menos 3 caracteres', isValid: false };
  }
  return { isValid: true };
}

function validateAge(age) {
  if (typeof age !== 'number' || !age) {
    return { message: 'O campo "age" é obrigatório', isValid: false };
  }
  if (age < 18) {
    return { message: 'A pessoa palestrante deve ser maior de idade', isValid: false };
  }
  return { isValid: true };
}

function validateFields(talk) {
  if (!talk || talk.rate === undefined || !talk.watchedAt) {
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        isValid: false,
    };
  }
  return { isValid: true };
}

function validateTalk(talk) {
  const responseFields = validateFields(talk);
  if (!responseFields.isValid) {
    return responseFields;
  }
  if (!isDateValid(talk.watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', isValid: false };
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5', isValid: false };
  }
  return { isValid: true };
}

function validateTalker(talker) {
  const { name, age, talk } = talker;
  const validationName = validateName(name);
  if (!validationName.isValid) {
    return validationName;
  }
  const validationAge = validateAge(age);
  if (!validationAge.isValid) {
    return validationAge;
  }
  const validationTalk = validateTalk(talk);
  if (!validationTalk.isValid) {
    return validationTalk;
  }
  return { isValid: true };
}

function isEmailValid(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
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

app.post('/talker', validationTokenMiddleware, (req, res) => {
  const { name, age, talk } = req.body;
  const talker = req.body;
  const response = validateTalker(talker);
  if (!response.isValid) {
    return res.status(400).json({ message: response.message });
  }
  const newTalker = { id: getLastId() + 1, name, age, talk };
  insertTalker(newTalker);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', validationTokenMiddleware, (req, res) => {
  const newTalker = req.body;
  const { id } = req.params;
  const response = validateTalker(newTalker);
  if (!response.isValid) {
    return res.status(400).json({ message: response.message });
  }
  const idNumber = parseInt(id, 10);
  updateTalker(idNumber, newTalker);
  res.status(200).json({ id: idNumber, ...newTalker });
});

app.delete('/talker/:id', validationTokenMiddleware, (req, res) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  deleteTalker(idNumber);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.get('/talker/search', validationTokenMiddleware, (req, res) => {
  const talkers = getTalkers();
  const { q } = req.query;
  const response = talkers.filter((t) => t.name.includes(q));
  res.status(200).json(response);
});

app.get('/talker/:id', (req, res) => {
  const talkers = getTalkers();
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});