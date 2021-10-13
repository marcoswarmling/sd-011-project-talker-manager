const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const emailValidation = require('./ middleware/validateEmail');
const passwordValidation = require('./ middleware/validatePassword');
const { genToken, verifyToken } = require('./ middleware/genToken');
const validateAge = require('./ middleware/validateAge');
const validateName = require('./ middleware/validateName');
const validateRate = require('./ middleware/validateRate');
const validateWatchedAt = require('./ middleware/validateWatchedAt');
const validateTalk = require('./ middleware/validateTalk');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const { id } = req.params;
  const findTalkersById = talkers.find((talker) => talker.id === parseInt(id, 10));
  if (!findTalkersById) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(findTalkersById);
});

app.post('/login', emailValidation, passwordValidation, genToken);

app.post('/talker', verifyToken, validateName,
 validateAge, validateTalk, validateWatchedAt, validateRate,
(req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const newTalker = req.body;
  newTalker.id = talkers.length + 1;
  talkers.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(talkers, null, 2));
  res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
