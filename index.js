const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const db = './talker.json';

function generateToken(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

const authMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  const regex = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email);
  if (!regex) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validateTokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  const regex = /^[A-Za-z0-9]*$/;
  if (!regex.test(authorization) || authorization.length > 16 || authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateNameMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAgeMiddleware = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalkMiddleware = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message:
       'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateDateMiddleware = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!watchedAt) {
    return res.status(400).json({ message: 
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRateMiddleware = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate && rate !== 0) {
    return res.status(400).json({ message:
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const talker = await fs.readFile(db);
    res.status(200).json(JSON.parse(talker));
  } catch (error) {
    res.status(200).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await fs.readFile(db, 'utf8');
    const teste = JSON.parse(talker).find((t) => t.id === parseInt(id, 10));
    if (!teste) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(teste);
  } catch (error) {
    res.status(400).json({ message: 'Algo deu errado, tente novamente.' });
  }
});

app.post('/login', authMiddleware, (req, res) => {
  const token = generateToken(16);
  res.status(200).json({ token });
});

app.post('/talker',
 validateTokenMiddleware,
 validateNameMiddleware,
 validateAgeMiddleware,
 validateTalkMiddleware, validateDateMiddleware, validateRateMiddleware, async (req, res) => {
  const { name, age, talk } = req.body;
  const response = await fs.readFile(db, 'utf8');
  const talkers = JSON.parse(response);
  talkers.push({ id: talkers.length + 1, name, age, talk });
  await fs.writeFile(db, JSON.stringify(talkers));
  res.status(201).json({ id: talkers.length, name, age, talk });
});

app.put('/talker/:id', validateTokenMiddleware,
validateNameMiddleware,
validateAgeMiddleware,
validateTalkMiddleware, validateDateMiddleware, validateRateMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const response = await fs.readFile(db, 'utf8');
  const talkers = JSON.parse(response);
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  if (talkerIndex === -1) return res.status(404).json({ message: 'Pessoa não encontrada' });
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
  await fs.writeFile(db, JSON.stringify(talkers));
  res.status(200).json(talkers[talkerIndex]);
});

app.listen(PORT, () => {
  console.log('Online');
});
