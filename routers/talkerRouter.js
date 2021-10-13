const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const TALKER_FILE = 'talker.json';
const authToken = require('../middlewares/authtoken');
const { 
  nameAuth,
  ageAuth,
  watchedAtAuth,
  rateAuth,
  talkAuth, 
} = require('../middlewares/authtalker');

function readTalkerFile() {
  return fs.readFile(TALKER_FILE, 'utf-8').then((data) => JSON.parse(data)); 
}
router.get('/', (_req, res) => {
  readTalkerFile()
    .then((data) => {
      res.status(200).json(data);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  readTalkerFile()
    .then((data) => {
      const talkerById = data.find((talker) => talker.id === parseInt(id, 10));
      if (!talkerById) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }

      res.status(200).json(talkerById);
    });
});

router.post(
  '/', 
  authToken,
  nameAuth,
  ageAuth,
  talkAuth,
  watchedAtAuth,
  rateAuth,
  (req, res) => {
    readTalkerFile()
    .then((data) => {
      const talkers = data;
      const newTalker = {
        id: talkers.length + 1,
        ...req.body,
      };

      talkers.push(newTalker);

      fs.writeFile('./talker.json', JSON.stringify(talkers));

      res.status(201).json({ ...newTalker });
    });
  },
);

module.exports = router; 
