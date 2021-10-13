const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./middleware/auth');

const app = express();
app.use(bodyParser.json());

const talkerFile = './talker.json';

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await fs.readFile(talkerFile, 'utf-8');
  const fetchData = await JSON.parse(data);

  res.status(HTTP_OK_STATUS).json(fetchData);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(talkerFile, 'utf-8');
  const fetchData = await JSON.parse(data);
  const reqId = fetchData.find((resp) => resp.id === Number(id));
  if (!reqId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(reqId);
});

app.post('/login', validateEmail, validatePassword, (_req, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(HTTP_OK_STATUS).send({
    token,
  });
});

app.post('/talker', validateToken, validateName,
  validateAge, validateTalk, validateWatchedAt, validateRate, async (req, response) => {
    const { name, age, talk } = req.body;
    const data = await fs.readFile(talkerFile, 'utf-8');
    const fetchData = await JSON.parse(data);
    const newData = {
      id: fetchData.length + 1,
      name,
      age,
      talk,
    };
    fetchData.push(newData);
    await fs.writeFile('./talker.json', JSON.stringify(fetchData));
    return response.status(201).json(newData);
  });

app.put('/talker/:id', validateToken, validateName,
  validateAge, validateTalk, validateWatchedAt, validateRate, async (req, response) => {
    const { id } = req.params;
    const data = await fs.readFile(talkerFile, 'utf-8');
    const fetchData = await JSON.parse(data);
    const { name, talk, age } = req.body;
    const talkerId = {
      id: Number(id),
      name,
      age,
      talk,
    };
    const updateTalkers = fetchData.map((talker) => {
      if (talker.id === Number(id)) return talkerId;
      return talker;
    });

    await fs.writeFile('./talker.json', JSON.stringify(updateTalkers));
    response.status(HTTP_OK_STATUS).json(talkerId);
  });

app.listen(PORT, () => {
  console.log('Online');
});
