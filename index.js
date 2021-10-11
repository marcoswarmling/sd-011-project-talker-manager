const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { emailHandler, passwordHandler, tokenHandler } = require('./middlewares/authMiddlewares');
const {
  nameHandler,
  ageHandler,
  talkHandler,
  talkContentHandler,
} = require('./middlewares/talkerMiddlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_STATUS_201 = 201;
const HTTP_STATUS_404 = 404;
const PORT = '3000';
const talkerPath = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talkers = await fs.readFile(talkerPath, 'utf-8');

  res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
});

app.get('/talker/:id', async (req, res) => {
  const readData = await fs.readFile(talkerPath, 'utf-8');
  const talkers = JSON.parse(readData);
  const { id } = req.params;
  const talkerFound = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!talkerFound) {
    return res.status(HTTP_STATUS_404).send({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(talkerFound);
});

app.post('/login', emailHandler, passwordHandler, (req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

app.post(
  '/talker',
  tokenHandler,
  nameHandler,
  ageHandler,
  talkHandler,
  talkContentHandler,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const data = await fs.readFile(talkerPath, 'utf-8');
    const talkers = JSON.parse(data);
    const id = talkers.length + 1;
    const newTalker = { name, age, id, talk: { ...talk } };

    talkers.push(newTalker);
    fs.writeFile(talkerPath, JSON.stringify(talkers));

    res.status(HTTP_STATUS_201).json(newTalker);
  },
);

app.put(
  '/talker/:id',
  tokenHandler,
  nameHandler,
  ageHandler,
  talkHandler,
  talkContentHandler,
  async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, age, talk } = req.body;
    const data = await fs.readFile(talkerPath, 'utf-8');
    const talkers = JSON.parse(data);
    const editedTalker = { name, age, id, talk: { ...talk } };
    const talkerIndex = talkers.findIndex((talker) => talker.id === id);

    talkers[talkerIndex] = { ...editedTalker };

    fs.writeFile(talkerPath, JSON.stringify(talkers));

    res.status(HTTP_OK_STATUS).json(editedTalker);
  },
);

app.delete('/talker/:id', tokenHandler, async (req, res) => {
  const id = JSON.parse(req.params.id);
  const data = await fs.readFile(talkerPath, 'utf-8');
  const talkers = JSON.parse(data);
  const talkerIndex = talkers.findIndex((talker) => talker.id === id);

  if (talkerIndex === -1) {
    res.send(HTTP_STATUS_404).json({ message: 'Talker não encontrado!' });
  }

  talkers.splice(talkerIndex, 1);

  fs.writeFile(talkerPath, JSON.stringify(talkers), 'utf-8');

  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});