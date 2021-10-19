const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const talkerArray = './talker.json';

const app = express();
app.use(bodyParser.json());

const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const HTTP_OK_STATUS = 200;

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
// Referência do regex.

const checkEmail = (req, res, next) => {
  const regexCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexCheck.test(email)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  const passwordSize = 6;

  if (!password || password === '') {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < passwordSize) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  const nameSize = 3;

  if (!name || name === '') {
    return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < nameSize) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
  const minAge = 18;

  if (!age || age === '') {
    return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < minAge) {
    return res.status(BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk === {} || !talk.watchedAt || talk.rate === undefined) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const checkBothRateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const watchedDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!watchedDate.test(talk.watchedAt)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenSize = 16;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }

  if (authorization.length < tokenSize) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }

  next();
};

app.get('/talker/search', checkToken,

async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(talkerArray, 'utf-8'));
  const { q } = req.query;
  const searchTerm = talkers.filter((t) => t.name.includes(q));

  if (searchTerm === undefined || searchTerm === '') {
    return res.status(NOT_FOUND).json(talkers);
  }

  if (!searchTerm) {
    return res.status(NOT_FOUND).json([]);
  }

  res.status(HTTP_OK_STATUS).json(searchTerm);
});

app.get('/talker/:id', async (req, res) => {
  const content = await fs.readFile(talkerArray, 'utf-8');
  const { id } = req.params;
  const talker = JSON.parse(content).find((t) => t.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker', async (_req, res) => {
  const content = await fs.readFile(talkerArray, 'utf-8');
  return res.status(HTTP_OK_STATUS).json(JSON.parse(content));
});

app.post('/login', checkEmail, checkPassword,
(_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', checkToken, checkName,
checkAge, checkTalk, checkBothRateWatchedAt,
async (req, res) => {
  const content = JSON.parse(await fs.readFile(talkerArray, 'utf-8'));
  const { name, age, talk } = req.body;
  const lastId = content[content.length - 1].id;

  content.push({ id: lastId + 1, name, age, talk });
  const talker1 = await content[content.length - 1];
  const talkers = JSON.stringify(content);
  fs.writeFile(talkerArray, talkers);
  return res.status(CREATED).json(talker1);
});

app.put('/talker/:id',
checkToken,
checkName,
checkAge,
checkTalk,
checkBothRateWatchedAt,
async (req, res) => {
  const content = JSON.parse(await fs.readFile(talkerArray, 'utf-8'));
  const { id } = req.params;
  const talkerIndex = content.findIndex((c) => c.id === parseInt(id, 10));
  const { name, age, talk } = req.body;
  const { rate, watchedAt } = talk;
  content[talkerIndex] = {
    id: Number(id),
    name,
    age: Number(age),
    talk: {
      rate: Number(rate),
      watchedAt,
    },
  };
  const talkers = JSON.stringify(content);
  await fs.writeFile(talkerArray, talkers);

  return res.status(HTTP_OK_STATUS).json(content[talkerIndex]);
});

app.delete('/talker/:id', checkToken,

async (req, res) => {
  const content = JSON.parse(await fs.readFile(talkerArray));
  const { id } = req.params;
  const talkerIndex = content.findIndex((c) => c.id === parseInt(id, 10));

  content.splice(talkerIndex, 1);
  await fs.writeFile(talkerArray, JSON.stringify(content));
  return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
