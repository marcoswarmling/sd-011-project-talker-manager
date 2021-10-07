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

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  if (!email) {
    return res.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!reg.test(email)) {
    return res.status(400).send({ 
      message: 'O "email" deve ter o formato "email@email.com"',
  });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({ 
      message: 'O campo "password" é obrigatório',
  });
  }
  if (password.length < 6) {
    return res.status(400).send({ 
      message: 'O "password" deve ter pelo menos 6 caracteres',
  });
  }
  next();
};

// Crie o endpoint POST /login
app.post('/login', validateEmail, validatePassword, (_req, response) => {
  const token = crypto.randomBytes(8).toString('hex');
    return response.status(HTTP_OK_STATUS).send({
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
  if (watchedAt === undefined || rate === undefined) {
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

// Não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.status(HTTP_OK_STATUS).send());

// Crie o endpoint GET /talker/search
app.get('/talker/search', validateToken, async (req, res) => {
  const fileData = await readTalker();
  const fileDataJson = JSON.parse(fileData);
  const { q } = req.query;
  const search = fileDataJson.filter((t) => t.name.includes(q));
  if (!q || q === '') {
    return res.status(200).send(fileDataJson);
  }
    return res.status(200).send(search);
});

// Crie o endpoint GET /talker
app.get('/talker', async (_req, res) => {
  const fileData = await readTalker();  
    if (!fileData) {
      return res.status(HTTP_OK_STATUS).send([]);
    }    
    return res.status(HTTP_OK_STATUS).send(JSON.parse(fileData));  
});

// Crie o endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const fileData = await readTalker();
    const people = JSON.parse(fileData).find((p) => p.id === Number(id));
    if (people) {
      res.status(HTTP_OK_STATUS).send(people);
    } else {
      return res.status(404).send({
        message: 'Pessoa palestrante não encontrada',
      });    
    }
});

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

// Crie o endpoint PUT /talker/:id
app.put('/talker/:id', validateToken, validateName,
validateAge, validateTalk, validateWathedAtAndRate, async (req, res) => {
  const { id } = req.params;
  const fileData = await readTalker();
  const fileDataJson = JSON.parse(fileData);
  const { name, talk, age } = req.body;
  const talkIndex = fileDataJson.findIndex((t) => t.id === parseInt(id, 10));
  const idInt = Number(id);
  fileDataJson[talkIndex] = { id: idInt, name, age, talk };
  fs.writeFile('./talker.json', JSON.stringify(fileDataJson));
    return res.status(200).json(fileDataJson[talkIndex]);
});

// Crie o endpoint DELETE /talker/:id
app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const idInt = parseInt(id, 10);
  const fileData = await readTalker();
  const fileDataJson = JSON.parse(fileData);
  const newFileDataJson = fileDataJson.filter((t) => t.id !== idInt);
  fs.writeFile('./talker.json', JSON.stringify(newFileDataJson));
    return res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
