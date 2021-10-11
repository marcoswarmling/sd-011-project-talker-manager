const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { emailHandler, passwordHandler } = require('./middlewares/loginMiddlewares');
const {
  tokenHandler,
  nameHandler,
  ageHandler,
  talkHandler,
  talkContentHandler,
} = require('./middlewares/addTalkerMiddlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_STATUS_201 = 201;
const HTTP_STATUS_404 = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');

  res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
});

app.get('/talker/:id', async (req, res) => {
  const readData = await fs.readFile('./talker.json', 'utf-8');
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
    const data = await fs.readFile('./talker.json', 'utf-8');
    const talkers = JSON.parse(data);
    const id = talkers.length + 1;
    const newTalker = { name, age, id, talk: { ...talk } };

    talkers.push(newTalker);
    fs.writeFile('./talker.json', JSON.stringify(talkers));

    res.status(HTTP_STATUS_201).json(newTalker);
  },
);