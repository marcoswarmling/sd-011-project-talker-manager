const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const talker = await fs.readFile('./talker.json');
    res.status(200).json(JSON.parse(talker));
  } catch (error) {
    res.status(200).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await fs.readFile('./talker.json', 'utf8');
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

app.listen(PORT, () => {
  console.log('Online');
});
