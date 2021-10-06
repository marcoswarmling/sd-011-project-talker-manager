const express = require('express');
const fs = require('fs');
const { generateToken } = require('./suportFunction');
const { emailValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  dateValidation,
  watchedAtValidation } = require('./validationFunctions');
// const bodyParser = require('body-parser');
const talkerFile = './talker.json';
const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// 1
app.get('/talker', (_req, res) => {
  try { 
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// 2
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  try { 
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
    const getById = talkers.find((t) => t.id === parseInt(id, 10));
    if (!getById) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(getById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidation(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({
    token: generateToken(16),
  });
});

// 4

app.post('/talker', 
tokenValidation, nameValidation, ageValidation, watchedAtValidation, dateValidation, (req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
    const { name, age, talk } = req.body;
    const addTalker = { name, age, talk: { ...talk }, id: talkers.length + 1 };

    talkers.push(addTalker);

    fs.writeFileSync(talkerFile, JSON.stringify(talkers));
    return res.status(201).json(addTalker);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

// 5 

app.put(
  '/talker/:id',
  tokenValidation, nameValidation, ageValidation, watchedAtValidation, dateValidation,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    try {
      const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
      const index = talkers.findIndex((t) => t.id === parseInt(id, 10));
      talkers[index] = { ...talkers[index], name, age, talk };
      fs.writeFileSync(talkerFile, JSON.stringify(talkers));

      return res.status(200).json(talkers[index]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
);

// 6
app.delete('/talker/:id', tokenValidation, (req, res) => {
  const { id } = req.params;

  try {
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
    const index = talkers.findIndex((t) => t.id === parseInt(id, 10));
    talkers.splice(index, 1);
    fs.writeFileSync(talkerFile, JSON.stringify(talkers));

    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
