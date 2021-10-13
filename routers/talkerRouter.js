const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const { readFile } = require('../helper/readFile');

const {
  validateName,
  validateAge,
  validateToken,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middlewares/newTalker');

router.get('/talker', async (_req, res) => {
  const talker = await readFile();
  return res.status(200).json(talker);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readFile();
  const talkerId = talker.find((t) => t.id === Number(id));

  if (!talkerId) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  
  return res.status(200).json(talkerId);
});

router.post('/talker',
  validateName,
  validateAge,
  validateToken,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await readFile();
  const id = talker.length + 1;

  talker.push({ id, name, age, talk });
  await fs.newFile('../talker.json', JSON.stringify(talker));
  return res.status(201).status({ name, age, talk, id });
});

module.exports = router;
