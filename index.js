const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const {
  emailValidation,
  passwordValidation,
  generateToken,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
} = require('./fieldsValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerJSON = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1 - Crie o endpoint GET /talker
app.get('/talker', async (req, res) => {
  const returnedTalkers = await fs.readFile(talkerJSON, 'utf-8');
  if (!returnedTalkers) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(JSON.parse(returnedTalkers));
});

// Requisito 2 - Crie o endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const returnedTalkers = await fs.readFile(talkerJSON, 'utf-8');
  const talkersDB = JSON.parse(returnedTalkers);
  const { id } = req.params;
  const talkerId = talkersDB.find((talker) => talker.id === Number(id));
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talkerId);
});

// Requisito 3 - Crie o endpoint POST /login
app.post('/login',
  emailValidation,
  passwordValidation,
  generateToken);

// Requisito 4 - Crie o endpoint POST /talker
app.post('/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const returnedTalkers = await fs.readFile(talkerJSON, 'utf-8');
    const talkersDB = JSON.parse(returnedTalkers);
    const newTalker = { id: talkersDB.length + 1, name, age, talk };
    talkersDB.push(newTalker);
    fs.writeFile(talkerJSON, JSON.stringify(talkersDB));
    return res.status(201).json(newTalker);
  });

// Requisito 5 - Crie o endpoint PUT /talker/:id
app.put('/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;
    const returnedTalkers = await fs.readFile(talkerJSON, 'utf-8');
    const talkersDB = JSON.parse(returnedTalkers);
    const newTalkersDB = talkersDB.map((talker) => {
      if (talker.id === Number(id)) {
        return {
          id: Number(id), name, age, talk,
        };
      }
      return talker;
    });
    fs.writeFile(talkerJSON, JSON.stringify(newTalkersDB));
    return res.status(HTTP_OK_STATUS).json({ id: Number(id), name, age, talk });
  });

// Requisito 6 - Crie o endpoint DELETE /talker/:id
app.delete('/talker/:id',
  tokenValidation,
  async (req, res) => {
    const { id } = req.params;
    const returnedTalkers = await fs.readFile(talkerJSON, 'utf-8');
    const talkersDB = JSON.parse(returnedTalkers);
    const filteredIds = talkersDB.filter((talker) => talker.id !== Number(id));
    fs.writeFile(talkerJSON, JSON.stringify(filteredIds));
    return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });

  // Requisito 7 - Crie o endpoint GET /talker/search?q=searchTerm
app.get('/talker/search',
tokenValidation,
async (req, res) => {
  const returnedTalkers = await fs.readFile(talkerJSON, 'utf-8');
  const talkersDB = JSON.parse(returnedTalkers);
  const searchTerm = req.query.q;

  if (!searchTerm || searchTerm === '') {
    return res.status(HTTP_OK_STATUS).json(talkersDB);
  }
  const filteredTalkers = talkersDB.filter((talker) => talker.name.includes(searchTerm));

  return res.status(HTTP_OK_STATUS).json(filteredTalkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
