const express = require('express');
const fs = require('fs');
const token = require('../middlewares/token');
const name = require('../middlewares/name');
const age = require('../middlewares/age');
const talk = require('../middlewares/talk');
const talkObj = require('../middlewares/talkObj');
const campos = require('../middlewares/campos');
const rate = require('../middlewares/rate');

const talkerFile = './talker.json';

const router = express.Router();

router.get('/', (req, res) => {
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
  token,
  name,
  age, 
  talk, 
  talkObj, 
  campos, 
  rate,
  (req, res) => {
    const { postName, postAge, postTalk } = req.body;

    try {
      const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf-8'));
      const lastTalker = talkers[talkers.length - 1];
      const newTalker = { postName, postAge, postTalk, id: Number(lastTalker.id) + 1 };
      
      talkers.push(newTalker);

    fs.writeFileSync(talkerFile, JSON.stringify(talkers));
    res.status(201).json(newTalker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  });

router.put('/:id', 
  token,
  name,
  age, 
  talk, 
  talkObj, 
  campos, 
  rate,
  (req, res) => {
    const { id } = req.params;
    const { putName, putAge, putTalk } = req.body;

    try {
      const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
      const editedTalker = { putName, putAge, putTalk, id: Number(id) };
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
