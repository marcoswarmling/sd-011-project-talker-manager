const express = require('express');
const fs = require('fs');
const { 
  isValidToken, 
  isValidAge,
  isValidName,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
} = require('../managers/Managers');

const talkerRouter = express.Router();
const TALKER = './talker.json';
const UTF = 'utf-8';

talkerRouter.get('/', (_req, res) => {
  try {
    const talkers = fs.readFileSync(TALKER, UTF);
    return res.status(200).json(JSON.parse(talkers));
  } catch (error) {
    return res.status(500).json({ error });
  }
});

talkerRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const talkers = JSON.parse(fs.readFileSync(TALKER, UTF));

    const foundTalker = talkers.find((talker) => talker.id === Number(id));

    return foundTalker
      ? res.status(200).json(foundTalker)
      : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

talkerRouter.post(
  '/',
  isValidToken,
  isValidAge,
  isValidName,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  (req, res) => {
    const { body } = req;

    try {
      const talkers = JSON.parse(fs.readFileSync(TALKER, UTF));

      const newTalker = { id: talkers[talkers.length - 1].id + 1, ...body };

      const updatedTalkers = [...talkers, newTalker];

      fs.writeFileSync(TALKER, JSON.stringify(updatedTalkers));

      return res.status(201).json({ ...newTalker });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
);

talkerRouter.put(
  '/:id',
  isValidToken,
  isValidAge,
  isValidName,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const talkers = JSON.parse(fs.readFileSync(TALKER, UTF));

      const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));

      const updatedTalker = { id: Number(id), ...body };

      const updatedTalkers = [...filteredTalkers, updatedTalker]
        .sort((first, second) => first.id - second.id);

      fs.writeFileSync(TALKER, JSON.stringify(updatedTalkers));

      return res.status(200).json({ ...updatedTalker });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
);

module.exports = talkerRouter;
