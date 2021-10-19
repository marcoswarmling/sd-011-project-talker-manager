const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const talkerArray = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  const passwordSize = 6;

  if (!password || password === '') {
    return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < passwordSize) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
// Referência do regex.

const checkEmail = (req, res, next) => {
  const regexCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexCheck.test(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  const nameSize = 3;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < nameSize) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
  const minAge = 18;

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < minAge) {
    return res.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk === {} || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const checkBothRateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const watchedDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!watchedDate.test(talk.watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenSize = 16;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length < tokenSize) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

// 1

app.get('/talker', async (_req, res) => {
  const talkerList = await fs.readFile(talkerArray, 'utf-8');
    return res.status(HTTP_OK_STATUS).json(JSON.parse(talkerList));
});

// 2

app.get('/talker/:id', async (req, res) => {
  const talkerList = await fs.readFile(talkerArray, 'utf-8');
  const { id } = req.params;
  const talker = JSON.parse(talkerList).find((t) => t.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(talker);
});

// 3

app.post('/login', checkEmail, checkPassword,
(_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(HTTP_OK_STATUS).json({ token });
});

// 4

app.post('/talker',
checkToken,
checkName,
checkAge,
checkTalk,
checkBothRateWatchedAt,
async (req, res) => {
  const content = JSON.parse(await fs.readFile(talkerArray, 'utf-8'));
  const { name, age, talk } = req.body;
  const lastId = content[content.length - 1].id;

  content.push({ id: lastId + 1, name, age, talk });
  const talker1 = await content[content.length - 1];
  const talkers = JSON.stringify(content);
  fs.writeFile(talkerArray, talkers);
  return res.status(talkerArray).json(talker1);
});

app.listen(PORT, () => {
  console.log('Online');
});
