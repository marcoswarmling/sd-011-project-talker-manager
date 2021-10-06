const express = require('express');

const router = express.Router();
const fs = require('fs');
const validateTalk = require('../middlewares/validateTalk');
const validateTalkObject = require('../middlewares/validateTalkObject');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');

router.get('/', (_req, res) => {
  try {
    const talker = fs.readFileSync('./talker.json');
    res.status(200).json(JSON.parse(talker));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const talkers = fs.readFileSync('./talker.json');
    const talker = JSON.parse(talkers).find((t) => Number(t.id) === Number(id));
    return talker 
    ? res.status(200).json(talker) 
    : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.post('/',
  validateTalk,
  validateTalkObject,
  validateAge,
  validateName, (req, res) => {
    const { name, age, talk } = req.body;
    try {
      const talkers = fs.readFileSync('./talker.json');
      const lastTalker = talkers[talkers.length - 1];
      const newTalker = {
        id: Number(lastTalker.id) + 1,
        name,
        age,
        talk,
      };
      talkers.push(newTalker);
      fs.writeFileSync('./talker.json', JSON.stringify(talkers));
      res.status(201).json(newTalker);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }    
});

module.exports = router;
