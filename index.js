const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

async function readTalker() {
  const fileData = await fs.readFile('./talker.json', 'utf8');
  return fileData;
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Crie o endpoint GET /talker
app.get('/talker', async (_request, response) => {
  const fileData = await readTalker();  
    if (!fileData) {
      response.status(HTTP_OK_STATUS).send([]);
    }    
      response.status(HTTP_OK_STATUS).send(JSON.parse(fileData));  
});

// Crie o endpoint GET /talker/:id
app.get('/talker/:id', async (req, response) => {
  const { id } = req.params;
  const fileData = await readTalker();
    const people = JSON.parse(fileData).find((p) => p.id === Number(id));
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
  const token = crypto.randomBytes(8).toString('hex');
    response.status(HTTP_OK_STATUS).send({
      token,
    });
});

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization && authorization.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
   return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
   return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    } 
  const { watchedAt, rate } = talk;
  if (!watchedAt || !rate) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateWathedAtAndRate = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!patternData.test(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate % 1 !== 0 || rate < 1 || rate > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }  
  next();
};

// Crie o endpoint POST /talker
app.post('/talker', validateToken, validateName,
  validateAge, validateTalk, validateWathedAtAndRate, async (req, res) => {  
    const fileData = await readTalker();
    const fileDataJson = JSON.parse(fileData);
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const newTalk = { id: fileDataJson.length + 1, name, age, talk: { watchedAt, rate } };
    fileDataJson.push(newTalk);
    fs.writeFile('./talker.json', JSON.stringify(fileDataJson));
   return res.status(201).send(newTalk);
});

app.put('/talker/:id', validateToken, validateName,
validateAge, validateTalk, validateWathedAtAndRate, async (req, res) => {
  const fileData = await readTalker();
  const fileDataJson = JSON.parse(fileData);
  const { name, talk, age } = req.body;
  const talkIndex = fileDataJson.findIndex((t) => t.id === req.params.id);
  fileData[talkIndex] = { ...fileData[talkIndex], name, age, talk };
  fs.writeFile('./talker.json', JSON.stringify(fileData));
    return res.status(200).send(fileData[talkIndex]);
});

app.listen(PORT, () => {
  console.log('Online');
});
