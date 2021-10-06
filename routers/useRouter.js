const router = require('express').Router();
const randonToken = require('random-token');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const express = require('express');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

const {
  isValidEmail,
  isValidPassword,
} = require('../middlewares/validations');

// requisito 1
router.get('/talker', async (_req, res) => {
  const talker = await fs.readFile('./talker.json', 'utf8');
  if (!talker) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(JSON.parse(talker));
});

// requisito 2
router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile('./talker.json', 'utf8');
  const jsonData = JSON.parse(talker);
  const data = jsonData.find((item) => item.id === Number(id));
  if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(data);
});

// requisito 3
router.post(
  '/login',
  isValidEmail,
  isValidPassword,
  (_req, res) => {
    const token = randonToken(16);
    res.status(200).json({ token });
  },
);

module.exports = router;