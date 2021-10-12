const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const isValidEmail = require('./middlewares/isValidEmail');
const isValidPassword = require('./middlewares/isValidPassword');
const isValidToken = require('./middlewares/isValidToken');
const isValidName = require('./middlewares/isValidName');
const isValidAge = require('./middlewares/isValidAge');
const isValidTalk = require('./middlewares/isValidTalk');
const isValidWatchedAt = require('./middlewares/isValidWatchedAt');
const isValidRate = require('./middlewares/isValidRate');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const data = await fs.readFile('./talker.json', 'utf-8');
    const talkers = JSON.parse(data);
    res.status(HTTP_OK_STATUS).json(talkers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fs.readFile('./talker.json', 'utf-8');
    const talkers = JSON.parse(data);
    const talker = talkers.find((t) => t.id === Number(id));
    if (!talker) {
      return res.status(HTTP_NOT_FOUND_STATUS).json(
        { message: 'Pessoa palestrante não encontrada' },
        );
    }
    return res.status(HTTP_OK_STATUS).json(talker);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

app.post('/talker', 
  isValidToken, 
  isValidName, 
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      const talker = JSON.parse(await fs.readFile('./talker.json', 'utf8'));

      const addTalker = {
        name,
        age,
        id: talker.length + 1,
        talk,
      };
      talker.push(addTalker);
      await fs.writeFile('./talker.json', JSON.stringify(talker));
      return res.status(201).json(addTalker);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  });

app.listen(PORT, () => {
  console.log('Online');
});
