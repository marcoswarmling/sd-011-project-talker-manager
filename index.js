const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const generateToken = require('./authorizationToken.js');

const talker = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const validateEmail = (request, response, next) => {
  const { email } = request.body;
  const emailRegex = /\S+@\S+\.\S+/;
  // Referência: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const validationEmail = emailRegex.test(email);

  if (!email || email === '') {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validationEmail) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const talkersJSON = async () => {
  const list = await fs.readFile(talker);
  const responseList = await JSON.parse(list);
  return responseList;
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;

  if (!password || password === '') {
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

const validateName = (request, response, next) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};
const validateAge = (request, response, next) => {
  const { age } = request.body;
  if (!age || age === '') {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (request, response, next) => {
  const { talk } = request.body;
  if (!talk) {
    return response.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  const { watchedAt, rate } = talk;
  if ((!watchedAt) || (!rate && rate !== 0)) {
    return response.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  } 
  next();
};

const validateWatchedAt = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const validationDate = dateRegex.test(watchedAt);
  if (!validationDate) {
    return response.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  // Referência: https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy
  // https://www.regular-expressions.info/javascriptexample.html
  next();
};

const validateRate = (request, response, next) => {
  const { talk: { rate } } = request.body;
  if (rate < 1 || rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

// ROTAS
app.get('/talker', async (_request, response) => {
  const data = await talkersJSON();
  if (data.length === 0) return response.status(HTTP_OK_STATUS).json([]);
  response.status(HTTP_OK_STATUS).send(data);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const data = await talkersJSON();
  const talkerById = data.find((talkId) => talkId.id === Number(id));
  if (!talkerById) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(talkerById);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validateEmail, validatePassword, (request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: generateToken() });
});

app.post('/talker', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (request, response) => {
    const talkers = await talkersJSON();
    const postTalker = { id: talkers.length + 1, ...request.body };
    talkers.push(postTalker);
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
    return response.status(201).json(postTalker);
  // Referência: Ajuda com assincronicidade do arquivo com Anderson Silva - Andy - Turma 10-A
});

app.put('/talker/:id', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (request, response) => {
  const { id } = request.params;
  const data = await talkersJSON();
  const getTalkerIndex = data.findIndex((talkerId) => talkerId.id === Number(id));
  data[getTalkerIndex] = { ...data[getTalkerIndex], ...request.body };
  await fs.writeFile(talker, JSON.stringify(data));
  return response.status(200).json(data[getTalkerIndex]);
});

app.delete('/talker/:id',
  validateToken,
  async (request, response) => {
  const { id } = request.params;
  const data = await talkersJSON();
  const getTalkerIndex = data.findIndex((talkerId) => talkerId.id === Number(id));
  data.splice(getTalkerIndex, 1);
  await fs.writeFile(talker, JSON.stringify(data));
  return response.status(200).json({
    message: 'Pessoa palestrante deletada com sucesso'
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
