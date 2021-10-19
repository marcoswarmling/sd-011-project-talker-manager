const express = require('express');
const fs = require('fs');

const talkerRouter = express.Router();

talkerRouter.get('/', (_req, res) => {
  try {
    const talkers = fs.readFileSync('./talker.json', 'utf-8');
    return res.status(200).json(JSON.parse(talkers));
  } catch (error) {
    return res.status(500).json({ error });
  }
});

talkerRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

    const foundTalker = talkers.find((talker) => talker.id === Number(id));

    return foundTalker
      ? res.status(200).json(foundTalker)
      : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = talkerRouter;