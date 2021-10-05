const express = require('express');
const fs = require('fs');
const talkerValidator = require('../middlewares/talkerValidator');
const authValidator = require('../middlewares/authValidator');

const talkerRouter = express.Router();

const TALKER_FILE_PATH = './talker.json';

talkerRouter.get('/', (_req, res) => {
  try {
    const talkers = fs.readFileSync(TALKER_FILE_PATH, 'utf-8');

    return res.status(200).json(JSON.parse(talkers));
  } catch (error) {
    return res.status(500).json({ error });
  }
});

talkerRouter.get('/search', authValidator, (req, res) => {
  const { q = '' } = req.query;

  try {
    const talkers = JSON.parse(fs.readFileSync(TALKER_FILE_PATH, 'utf-8'));

    const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));

    return res.status(200).json(filteredTalkers);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

talkerRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const talkers = JSON.parse(fs.readFileSync(TALKER_FILE_PATH, 'utf-8'));

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
  authValidator,
  talkerValidator,
  (req, res) => {
    const { body } = req;

    try {
      const talkers = JSON.parse(fs.readFileSync(TALKER_FILE_PATH, 'utf-8'));

      const newTalker = { id: talkers[talkers.length - 1].id + 1, ...body };

      const updatedTalkers = [...talkers, newTalker];

      fs.writeFileSync(TALKER_FILE_PATH, JSON.stringify(updatedTalkers));

      return res.status(201).json({ ...newTalker });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
);

talkerRouter.put(
  '/:id',
  authValidator,
  talkerValidator,
  (req, res) => {
    const { body, params: { id } } = req;

    try {
      const talkers = JSON.parse(fs.readFileSync(TALKER_FILE_PATH, 'utf-8'));

      const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));

      const updatedTalker = { id: Number(id), ...body };

      const updatedTalkers = [...filteredTalkers, updatedTalker]
        .sort((first, second) => first.id - second.id);

      fs.writeFileSync(TALKER_FILE_PATH, JSON.stringify(updatedTalkers));

      return res.status(200).json({ ...updatedTalker });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
);

talkerRouter.delete('/:id', authValidator, (req, res) => {
  const { id } = req.params;

  try {
    const talkers = JSON.parse(fs.readFileSync(TALKER_FILE_PATH, 'utf-8'));

    const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));

    fs.writeFileSync(TALKER_FILE_PATH, JSON.stringify(filteredTalkers));

    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = talkerRouter;
