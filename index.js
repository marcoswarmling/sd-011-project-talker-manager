const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const talkerList = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = async () => {
  const talkers = await fs.readFile(talkerList);
  const result = await JSON.parse(talkers);
  return result;
};

const validateEmail = (request, response, next) => {
  const { email } = request.body;
  const emailRegex = /\S+@\S+\.\S+/;
  const emailValidation = emailRegex.test(email);
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidation) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;
  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validateToken = (request, response, next) => {
  const { authorization } = request.headers;  
  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateTalkerName = (request, response, next) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateTalkerAge = (request, response, next) => {
  const { age } = request.body;
  if (!age) {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalkerTalk = (request, response, next) => {
  const { talk } = request.body;
  if (!talk) {
    return response.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  const { watchedAt, rate } = talk;
  if (!watchedAt || !rate) {
    return response.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  } 
  next();
};

const validateWatchedAt = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt } = talk;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const validationDate = dateRegex.test(watchedAt);
  if (!validationDate) {
    return response.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validateRate = (request, response, next) => {
  const { talk } = request.body;
  const { rate } = talk;
  if (rate < 1 || rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

// Req 1
app.get('/talker', async (_request, response) => {
  const talkers = await getTalkers();
  if (talkers.length === 0) return response.status(HTTP_OK_STATUS).json([]);
  response.status(HTTP_OK_STATUS).send(talkers);
});

// Req 2
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await getTalkers();
  const talkerId = talkers.find((tId) => tId.id === Number(id));
  if (!talkerId) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(talkerId);
});

// Req 3
app.post('/login', validateEmail, validatePassword, (request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: crypto.randomBytes(8).toString('hex') });
});

// Req 4
app.post('/talker', 
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalkerTalk,
  validateWatchedAt,
  validateRate,
  async (request, response) => {
    const talkers = await getTalkers();
    const { name, age, talk } = request.body;
    const newTalker = { id: talkers.length + 1, name, age, talk };
    talkers.push(newTalker);
    await fs.writeFile(talkerList, JSON.stringify(talkers));
    return response.status(201).json(newTalker);
});

// Req 5
app.put('/talker/:id', 
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalkerTalk,
  validateWatchedAt,
  validateRate,
  async (request, response) => {
  const { id } = request.params;
  const talkers = await getTalkers();
  const updatingTalker = talkers.findIndex((tId) => tId.id === Number(id));
  talkers[updatingTalker] = { ...talkers[updatingTalker], ...request.body };
  await fs.writeFile(talkerList, JSON.stringify(talkers));
  return response.status(200).json(talkers[updatingTalker]);
});

// Req 6
app.delete('/talker/:id',
  validateToken,
  async (request, response) => {
  const { id } = request.params;
  const talkers = await getTalkers();
  const deletingTalker = talkers.findIndex((tId) => tId.id === Number(id));
  talkers.splice(deletingTalker, 1);
  await fs.writeFile(talkerList, JSON.stringify(talkers));
  return response.status(200).json({
    message: 'Pessoa palestrante deletada com sucesso',
  });
});

// Req 7
app.get('/talker/search',  
  validateToken,
  async (request, response) => {
    const { query } = request.query;
    const talkers = await getTalkers();
    if (!query || query === '') return response.status(200).json(talkers);
    const searchName = talkers.filter((talker) => talker.name.includes(query));
    if (!query) return response.status(200).json([]);
    return response.status(200).json(searchName);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
