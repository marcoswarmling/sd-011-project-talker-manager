const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const { reading } = require('../helpers/main');

const { 
  withOutName,
  tokenValid,
  ageValid,
  talkValid,
  rateInterval,
  validWatchedAt,
} = require('../middlewares/createdTalker');

router.get('/talker', async (_req, res) => {
  const talker = await reading();

  return res.status(200).json(talker);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await reading();
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

  const talker = await reading();

  const id = talker.length + 1;

  talker.push({ id, name, age, talk });
  await fs.writeFile('./talker.json', JSON.stringify(talker));
  return res.status(201).json({ name, age, talk, id });
});

router.put('/talker/:id', 
withOutName, 
tokenValid, 
ageValid, 
talkValid, 
rateInterval, 
validWatchedAt,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talker = await reading();

  const talkIndex = talker.findIndex((r) => r.id === Number(id));

  talker[talkIndex] = { ...talker[talkIndex], name, age, talk };
  await fs.writeFile('./talker.json', JSON.stringify(talker));

  const updateTalker = talker.find((r) => r.id === Number(id));
  return res.status(200).json(updateTalker);
});
// req 6
router.delete('/talker/:id', tokenValid, async (req, res) => {
  const { id } = req.params;
  const talker = await reading();

  const deletedTalker = talker.filter((r) => r.id !== Number(id));
  await fs.writeFile('./talker.json', JSON.stringify(deletedTalker));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.get('/talker/search', tokenValid, async (req, res) => {
  const { q } = req.query;
  const talker = await reading();

  const searchTalker = talker.filter((r) => r.name.includes(q));

  return res.status(200).json(searchTalker);
});

module.exports = router;
