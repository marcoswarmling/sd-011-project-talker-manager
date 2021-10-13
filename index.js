const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const crypto = require('crypto');
const { 
  HTTP_OK_STATUS,
  HTTP_UNAUTHORIZED,
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_CREATED_STATUS,
} = require('./httpStatusCode');

const app = express();
app.use(bodyParser.json());

// const HTTP_OK_STATUS = HTTP_OK_STATUS;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const FILE = async () => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(file);
};

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

// Requisito 1

app.get('/talker', async (_req, res) => {
  const talkers = await FILE();
  res.status(HTTP_OK_STATUS).json(talkers);
});

// Requisito 7:

app.get('/talker/search', tokenValidation, async (req, res) => {
  const { name } = req.query;
  const talkers = await FILE();
  if (!name) return res.status(HTTP_OK_STATUS).json(talkers);
  const queryTalkers = talkers.filter((t) => t.name.includes(name));
  res.status(HTTP_OK_STATUS).json(queryTalkers);
});

// Requisito 2

app.get('/talker/:id', async (req, res) => {
  const talkers = await FILE();
  const { id } = req.params;
  const myTalker = talkers.find((t) => t.id === parseInt(id, 10));
  if (!myTalker) { 
    return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' }); 
}
  res.status(HTTP_OK_STATUS).json(myTalker);
});

// Requisito 3

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email === '') { 
    return res
    .status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!reg.test(email)) { 
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

app.post('/login', validateEmail, validatePassword, (req, res) => {
  // https://www.codegrepper.com/code-examples/javascript/js+random+generate+token
  
  const token = crypto.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token });
});

// Requisito 4

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST).json(
      { message: 'O "name" deve ter pelo menos 3 caracteres' },
      );
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST).json(
      { message: 'A pessoa palestrante deve ser maior de idade' },
      );
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const reg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!reg.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
      );
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (rate > 5 || rate < 1) {
    return res.status(HTTP_BAD_REQUEST).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
      );
  }
  next();
};

const postTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await FILE();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  talkers.push(newTalker);
  await fs.writeFile('talker.json', JSON.stringify(talkers));
  return res.status(HTTP_CREATED_STATUS).json(newTalker);
};

app.post('/talker', [
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  postTalker,
]);

// Requisito 5

const putTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await FILE();
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
  await fs.writeFile('talker.json', JSON.stringify(talkers));
  res.status(HTTP_OK_STATUS).json(talkers[talkerIndex]);
};

app.put('/talker/:id', [
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  putTalker,
]);

// Requisito 6

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await FILE();
  const newTalkers = talkers.filter((t) => t.id !== parseInt(id, 10));
  await fs.writeFile('talker.json', JSON.stringify(newTalkers));
  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

app.delete('/talker/:id', [
  tokenValidation,
  deleteTalker,
]);

app.listen(PORT, () => {
  console.log('Online');
});
