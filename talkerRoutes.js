const fs = require('fs').promises;

const express = require('express');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getTalkers = await fs.readFile('./talker.json', 'utf-8');
  try {
    const talkersData = JSON.parse(getTalkers);
    const getTalker = talkersData.find((talker) => talker.id === parseInt(id, 10));
    if (getTalker) {
      return res.status(200).send(getTalker);
    }
    throw new Error();
  } catch (_err) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

router.get('/', async (_req, res) => {
  const getTalkers = await fs.readFile('./talker.json', 'utf-8');
  res.status(200).json(JSON.parse(getTalkers));
});

module.exports = router;
