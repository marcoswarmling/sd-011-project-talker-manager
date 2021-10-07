const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const readFilePromise = util.promisify(fs.readFile);

app.get('/talker', async (_request, response) => {
  try {
    const content = await readFilePromise('talker.json');
    const talker = JSON.parse(content);
    response.status(HTTP_OK_STATUS).json(talker);
  } catch (err) {
    response.status(HTTP_OK_STATUS).json([]);
  }
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const content = await readFilePromise('talker.json');
  const talkerJson = JSON.parse(content);
  const idTalker = talkerJson.find((talker) => talker.id === +id);
  if (!idTalker) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  return response.status(HTTP_OK_STATUS).json(idTalker);
});

// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
const tokenGenerator = () => {
  const length = 16;
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
};

const emailExists = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
 return res.status(400).json({
    message: 'O campo "email" é obrigatório',
  }); 
}
  next();
};

const validateEmail = (req, res, next) => {
  const recevedEmail = new RegExp('\\S+@\\S+\\.\\S+');
  const { email } = req.body;
  const validate = recevedEmail.test(email);
  if (!validate || validate === '') {
 return res.status(400).json({
    message: 'O "email" deve ter o formato "email@email.com"',
  }); 
}
  next();
};

const passwordExists = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
 return res.status(400).json({
    message: 'O campo "password" é obrigatório',
  }); 
}
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
 return res.status(400).json({
    message: 'O "password" deve ter pelo menos 6 caracteres',
  }); 
}
  next();
};

const validations = [
  emailExists,
  validateEmail,
  passwordExists,
  validatePassword,
];

app.post('/login', validations, (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: tokenGenerator() });
});

app.listen(PORT, () => {
  console.log('Online');
});
