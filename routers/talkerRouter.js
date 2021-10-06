const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const { 
  withOutName,
  tokenValid,
  ageValid,
  talkValid,
  rateInterval,
  validWatchedAt,
} = require('../middlewares/createdTalker');

router.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);

  return res.status(200).json(talker);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);
  const response = talker.find((r) => r.id === Number(id));

  if (!response) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  
  return res.status(200).json(response);
});

router.post('/talker', 
withOutName, 
tokenValid, 
ageValid, 
talkValid, 
rateInterval, 
validWatchedAt, 
async (req, res) => {
  const { name, age, talk } = req.body;

  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);

  const id = talker.length + 1;

  talker.push({ id, name, age, talk });
  await fs.writeFile('./talker.json', JSON.stringify(talker));
  return res.status(201).json({ name, age, talk, id });
});

module.exports = router;
