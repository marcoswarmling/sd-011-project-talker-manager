const express = require('express');
const fs = require('fs');
const valToken = require('../middlewares/token');
const valName = require('../middlewares/name');
const valAge = require('../middlewares/age');
const valTalk = require('../middlewares/talk');
const valTalkObj = require('../middlewares/talkObj');
const valCampos = require('../middlewares/campos');
const valRate = require('../middlewares/rate');

const talkerFile = './talker.json';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const talkers = fs.readFileSync(talkerFile, 'utf8');
    res.status(200).json(JSON.parse(talkers));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
    const talker = talkers.find((person) => Number(person.id) === Number(id));
    return talker
      ? res.status(200).json(talker)
      : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/', 
  valToken,
  valName,
  valAge, 
  valTalk, 
  valTalkObj, 
  valCampos, 
  valRate,
  (req, res) => {
    const { name, age, talk } = req.body;

    try {
      const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
      const lastTalker = talkers[talkers.length - 1];
      const newTalker = { name, age, talk, id: Number(lastTalker.id) + 1 };
      
      talkers.push(newTalker);

    fs.writeFileSync(talkerFile, JSON.stringify(talkers));
    res.status(201).json(newTalker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  });

router.put('/:id', 
  valToken,
  valName,
  valAge, 
  valTalk, 
  valTalkObj, 
  valCampos, 
  valRate,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    try {
      const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
      const editedTalker = { name, age, talk, id: Number(id) };
      const newList = talkers.map((talker) => {
      if (Number(talker.id) === Number(id)) {
        return editedTalker;
      }
      return talker;
    });

    fs.writeFileSync(talkerFile, JSON.stringify(newList));
    res.status(200).json(editedTalker);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;
