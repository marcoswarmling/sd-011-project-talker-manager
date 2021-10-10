const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const messageTalkError = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };

const messageWatchedAtInvalid = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };

const messageDeleteSuccessfull = { message: 'Pessoa palestrante deletada com sucesso' };

const getTalkers = () => JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

const isEmailValid = (email) => (/^[\w.]+@[a-z]+\.\w{2,3}$/g).test(email);

const text = 'a1b2c3d4e5f6g7h8i9j0klmnopqrstuvwxyz';
const generateToken = () => {
  let token = '';
  for (let index = 0; index < 16; index += 1) {
    const position = Math.round(Math.random() * 16, 0);
    token += text[position];
  }
  return token;
};

const validadeHeaderAuthorization = (authorization, res) => {
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length < 16) return res.status(401).json({ message: 'Token inválido' });
};

const validadeFieldName = (name, res) => {
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length <= 2) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const validateFieldAge = (age, res) => {
  if (!Number.isInteger(age)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const validateWatchedField = (res, watchedAt) => {
  if (watchedAt) {
    if (!(/^..\/..\/....$/).test(watchedAt)) {
      return res.status(400).json(messageWatchedAtInvalid);
    }
  } else {
    return res.status(400).json(messageTalkError);
  }
};

const validadeFieldTalk = (talk, res) => {
  const { watchedAt, rate } = talk;
  validateWatchedField(res, watchedAt);

  if (rate) {
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  } else {
    return res.status(400).json(messageTalkError);
  }
};

const validationTalker = (params) => {
  const { res, authorization, name, age, talk } = params;
  validadeHeaderAuthorization(authorization, res);
  validadeFieldName(name, res);
  validateFieldAge(age, res);
  if (talk) {
    validadeFieldTalk(talk, res);
  } else {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
};

const generateIdTalker = () => {
  let talker = getTalkers();
  talker = talker[talker.length - 1];
  return talker.id + 1;
};

const getLastTalkerInserted = () => {
  const talker = getTalkers();
  return talker[talker.length - 1];
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 7
app.get('/talker/search', (req, res) => {
  const { q } = req.query;
  const regexp = RegExp(q);
  const filteredTalkers = getTalkers().filter((item) => regexp.test(item.name));
  res.status(200).json(filteredTalkers);
});

// Requisito 1:
app.get('/talker', (_req, res) => {
  res.status(200).json(getTalkers());
});

// Requisito 2:
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = getTalkers().find((item) => item.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

// Requisito 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  let message = '';
  // email:
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isEmailValid(email)) {
    message = 'O "email" deve ter o formato "email@email.com"';
    return res.status(400).json({ message }); 
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    message = 'O "password" deve ter pelo menos 6 caracteres';
    return res.status(400).json({ message });
  }
  res.status(200).json({ token: generateToken() });
});

// Requisito 4:
app.post('/talker', (req, res) => {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  validationTalker({ res, authorization, name, age, talk });
  const id = generateIdTalker();
  const obj = {
    name,
    age,
    id,
    talk: {
      watchedAt: talk.watchedAt,
      rate: talk.rate,
    },
  };
  const talkers = [...getTalkers(), obj];

  fs.writeFileSync('./talker.json', JSON.stringify(talkers));

  res.status(201).json(getLastTalkerInserted());
});

// Requisito 5:
app.put('/talker/:id', (req, res) => {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  const { id } = req.params;
  validationTalker({ res, authorization, name, age, talk });
  const talkers = getTalkers();
  const talker = talkers.find((item) => item.id === id);
  const obj = {
    id,
    name,
    age,
    talk: {
      watchedAt: talk.watchedAt,
      rate: talk.rate,
    },
  };
  talkers.splice(talkers.indexof(talker), 1, obj);
  fs.writeFileSync('./talker.json', JSON.stringify(talkers));
});

// Requisito 6:
app.delete('/talker/:id', (req, res) => {
  const { authorization } = req.headers;
  let { id } = req.params;
  id = parseInt(id, 10);
  validadeHeaderAuthorization(authorization, res);
  const talkers = getTalkers();
  const talker = talkers.find((item) => item.id === id);
  console.log(talkers.indexOf(talker));
  talkers.splice(talkers.indexOf(talker), 1);
  fs.writeFileSync('./talker.json', JSON.stringify(talkers));
  res.status(200).json(messageDeleteSuccessfull);
});

app.listen(PORT, () => {
  console.log('Online');
});
