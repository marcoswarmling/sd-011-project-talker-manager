const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

function readTalker() {
  const filedata = fs.readFile('./talker.json', 'utf8');
  return filedata;
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Crie o endpoint GET /talker
app.get('/talker', (_request, response) => {
    response.status(HTTP_OK_STATUS).send(readTalker);
});

// Crie o endpoint GET /talker/:id
app.get('/talker/:id', (req, response) => {
  const { id } = req.params;
  const filedata = readTalker;
  const people = filedata.find((p) => p.id === Number(id));
  if (people) {
    response.status(HTTP_OK_STATUS).send(people);
  } else {
    response.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
});

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  if (!email) {
    res.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!reg.test(email)) {
    console.log(reg.test(email));
    res.status(400).send({ 
      message: 'O "email" deve ter o formato "email@email.com"',
  });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(400).send({ 
      message: 'O campo "password" é obrigatório',
  });
  }
  if (password.length < 6) {
    res.status(400).send({ 
      message: 'O "password" deve ter pelo menos 6 caracteres',
  });
  }
  next();
};

// Crie o endpoint POST /login
app.post('/login', validateEmail, validatePassword, (_req, response) => {
    response.status(HTTP_OK_STATUS).send({
      token: '7mqaVRXJSp886CGr',
    });
});

const validateToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.status(401).send({ message: 'Token não encontrado' });
  }
  if (token && token.length < 16) {
    res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  if (!talk || !watchedAt || !rate) {
    res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateWathedAtAndRate = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!patternData.test(watchedAt)) {
    res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa' });
  }
  if (rate % 1 !== 0) {
    res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }  
  next();
};

// Crie o endpoint POST /talker
app.post('/talker', validateToken, validateName,
  validateAge, validateTalk, validateWathedAtAndRate, (req, res) => {  
    const { id, name, age, talk: { watchedAt, rate } } = req.body;
    res.status(201).send({ id, name, age, talk: { watchedAt, rate } });
});

app.listen(PORT, () => {
  console.log('Online');
});
