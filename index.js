const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');

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

app.get('/talker', async (_req, res) => {
  try {
  const talker = await fs.readFile('./talker.json', 'utf-8');
  res.status(HTTP_OK_STATUS).json(JSON.parse(talker));
} catch (err) {
  res.status(400).json({ message: err.message });
}
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await fs.readFile('./talker.json', 'utf-8');
    const dados = JSON.parse(talker).find((p) => p.id === Number(id));
    if (!dados) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(HTTP_OK_STATUS).json(dados);
} catch (err) {
  res.status(404).json({ message: err.message });
}
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});
