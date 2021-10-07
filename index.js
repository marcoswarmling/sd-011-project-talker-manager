const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const { 
  talkerDataMiddleware,
  authMiddleware,
  getToken,
  authPostMiddleware,
  authDeleteMiddleware,
} = require('./talkerData');

const app = express();
app.use(bodyParser.json());
app.use(talkerDataMiddleware);

const TALKER = 'talker.json';

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/talker', authDeleteMiddleware, authPostMiddleware, (req, res) => {
  const { data } = req;
  const { body } = req;
  const { name, age, talk } = body;
  const id = data[data.length - 1].id + 1;
  data.push({ name, id, age, talk });
  fs.writeFile(TALKER, JSON.stringify(data))
    .then(() => {
      res.status(201).json({ name, id, age, talk });
    })
    .catch((err) => {
      res.status(400).json({ message: `Erro ao escrever o arquivo: ${err.message}` });
    });
});

app.put('/talker/:id', authDeleteMiddleware, authPostMiddleware, (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const { data } = req;

  const talkerIndex = data.findIndex((r) => r.id === parseInt(id, 10));

  if (talkerIndex === -1) return res.status(404).json({ message: 'Talker not find!' });

  data[talkerIndex] = { ...data[talkerIndex], name, age, talk };

  fs.writeFile(TALKER, JSON.stringify(data))
    .then(() => {
      res.status(200).json({ name, id: parseInt(id, 10), age, talk });
    })
    .catch((err) => {
      res.status(400).json({ message: `Erro ao escrever o arquivo: ${err.message}` });
    });
});

app.delete('/talker/:id', authDeleteMiddleware, (req, res) => {
  const { id } = req.params;
  const { data } = req;

  const talkerIndex = data.findIndex((r) => r.id === parseInt(id, 10));

  if (talkerIndex === -1) return res.status(404).json({ message: 'Talker not found!' });

  data.splice(talkerIndex, 1);

  fs.writeFile(TALKER, JSON.stringify(data))
    .then(() => {
      res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    })
    .catch((err) => {
      res.status(400).json({ message: `Erro ao escrever o arquivo: ${err.message}` });
    });
});

app.get('/talker', (req, res) => {
  const { data } = req;

  if (data.length === 0) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/search', authDeleteMiddleware, (req, res) => {
  const { q } = req.query;
  const { data } = req;
  const filteredData = data.filter((d) => d.name.includes(q));
  if (!filteredData) return res.status(200).json([]);
  res.status(200).json(filteredData);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const { data } = req;
  const talker = data.find((d) => d.id === parseInt(id, 10));

  if (!talker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

app.post('/login', authMiddleware, (req, res) => {
  res.status(200).json({
    token: getToken(),
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
