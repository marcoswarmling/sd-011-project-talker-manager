const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const { 
  withOutName,
  tokenValid,
  ageValid,
  talkValid,
} = require('../middlewares/createTalkerValid');

router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile('./talker.json', 'utf8');
    const talker = JSON.parse(data);
    return res.status(200).json(talker);
  } catch (error) {
    console.error(error.message);
  }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await fs.readFile('./talker.json', 'utf8');
    const talker = JSON.parse(data);
    const response = talker.find((r) => r.id === Number(id));

    if (!response) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });

    return res.status(200).json(response);
});

router.post('/', withOutName, tokenValid, ageValid, talkValid, async (req, res) => {
  const { name, age, talk } = req.body;

  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);

  const id = talker.length + 1;

  talker.push({ id, name, age, talk });
  const writeFile = (content) => fs.writeFile('./talker.json', JSON.stringify(content));
  writeFile(talker);
  res.status(201).json({ name, age, talk, id });
});

module.exports = router;