const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

async function readOneFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const dataNotString = JSON.parse(data);
    return dataNotString;
  } catch (error) {
    console.log(error);
  }
}

app.get('/talker', async (_req, res) => {
  const talkers = await readOneFile('./talker.json');
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readOneFile('./talker.json');
  const { id } = req.params;
  const filteredTalker = talkers.find((talker) => Number(talker.id) === Number(id));
  if (!filteredTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(filteredTalker);
});

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!/^\S+@\S+\.\S+$/.test(email)) { // expressão encontrada em https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

const crypto = require('crypto');

app.post('/login', validateLogin, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
  });

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validateNameAge = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateExistTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  next();
};

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!/..\/..\/..../.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

app.post('/talker', validateToken, validateNameAge, validateExistTalk, validateTalk, 
async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readOneFile('./talker.json');
  const newTalkers = [...talkers, { id: talkers.length + 1, name, age, talk }];
  await fs.writeFile('./talker.json', JSON.stringify(newTalkers));
  res.status(201).json({ id: talkers.length + 1, name, age, talk });
});
