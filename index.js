const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');
const talkersSeed = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkersArray = async () => {
  const talkers = await fs.readFile(talkersSeed);
  const res = await JSON.parse(talkers);
  return res;
};

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  const regexValidation = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!email) {
    return res.status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexValidation.test(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401)
      .json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401)
      .json({ message: 'Token inválido' });
  }

  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt e "rate" não podem ser vazios' },
      );
}

const { rate, watchedAt } = talk;

if (!watchedAt || (!rate && rate !== 0)) {
  return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const checkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (typeof talk.rate !== 'number' || rate < 1 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const checkWatched = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  // https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy
  const dateValidation = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const dateCheck = dateValidation.test(watchedAt);

  if (!dateCheck) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

// 1
app.get('/talker', async (req, res) => {
  const talkers = await talkersArray();
  if (talkers.length === 0) return res.status(200).json([]);
      res.status(200).send(talkers);
});

// 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await talkersArray();
  const arrayId = talkers.find((a) => a.id === Number(id));

    if (!arrayId) {
      return res.status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
  return res.status(200).json(arrayId);
});

// 3
// Como referência o randomToken: https://www.npmjs.com/package/random-token
// fix: não consegui usar a API e tive que usar o crypto mesmo.

app.post('/login', checkEmail, checkPassword, async (req, res) => {
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

// 4

app.post('/talker',
checkAge,
checkName,
checkRate,
checkTalk,
checkToken,
checkWatched,
async (req, res) => {
  const talkers = await talkersArray();
  const { age, name, talk } = req.body;
  const talker1 = { id: talkers.length + 1, age, name, talk };
  talkers.push(talker1);
  await fs.writeFile(talkersArray, JSON.stringify(talkers));

  return res.status(201).json(talker1);
});

// 5

app.put('/talker/:id',
checkAge,
checkName,
checkRate,
checkTalk,
checkToken,
checkWatched,
async (req, res) => {
  const { id } = req.params;
  const talkers = await talkersArray();
  const updateTalker = talkers.findIndex((uId) => uId.id === Number(id));
  talkers[updateTalker] = { ...talkers[updateTalker], ...req.body };
  await fs.writeFile(talkersArray, JSON.stringify(talkers));
  return res.status(200)
    .json(talkers[updateTalker]);
});

// 6

app.delete('/talker/:id', checkToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await talkersArray();
  const deleteTalker = talkers.findIndex((delId) => delId.id === Number(id));
  talkers.splice(deleteTalker, 1);
  await fs.writeFile(talkersArray, JSON.stringify(talkers));
  return res.status(200)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
});

// 7

app.get('/talker/search', checkToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await talkersArray();
  const filteredArray = talkers.filter((a) => a.name.includes(q));

  if (!q) {
    return res.status(200).json(talkers);
  }
  if (!filteredArray) {
    return res.status(200).json([]);
  }
  res.status(200).json(filteredArray);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
