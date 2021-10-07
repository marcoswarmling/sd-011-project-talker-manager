const express = require('express');

const router = express.Router();
const fs = require('fs');
const validateTalk = require('../middlewares/validateTalk');
const validateTalkObject = require('../middlewares/validateTalkObject');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateToken = require('../middlewares/validateToken');
const validateFields = require('../middlewares/validateFields');

const talkerFile = './talker.json';

router.get('/', (_req, res) => {
  try {
    const talker = fs.readFileSync(talkerFile, 'utf8');
    res.status(200).json(JSON.parse(talker));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const talkers = fs.readFileSync(talkerFile, 'utf8');
    const talker = JSON.parse(talkers).find((t) => Number(t.id) === Number(id));
    return talker
      ? res.status(200).json(talker)
      : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.get('/search', validateToken, (req, res) => {
  const { q } = req.query;
  try {
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
    if (!q || q === '') return res.status(200).json(JSON.stringify(talkers));
    const talker = talkers.filter((person) => person.name.includes(q));
    return talker.length > 0
      ? res.status(200).json(talkers)
      : res.status(200).json([]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  res.status(200).end();
});

router.post('/',
  validateToken,
  validateFields,
  validateTalk,
  validateTalkObject,
  validateAge,
  validateName, (req, res) => {
    const { name, age, talk } = req.body;
    try {
      const talkers = fs.readFileSync(talkerFile, 'utf8');
      const lastTalker = talkers[talkers.length - 1];
      const newTalker = {
        id: Number(lastTalker.id) + 1,
        name,
        age,
        talk,
      };
      talkers.push(newTalker);
      fs.writeFileSync(talkerFile, 'utf8', JSON.stringify(talkers));
      res.status(201).json(newTalker);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

router.put('/:id',
  validateToken,
  validateFields,
  validateTalk,
  validateTalkObject,
  validateAge,
  validateName, (req, res) => {
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

      fs.writeFileSync(talkerFile, 'utf8', JSON.stringify(newList));
      res.status(200).json(editedTalker);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

router.delete('/:id', validateToken, (req, res) => {
  const { id } = req.params;

  try {
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
    const newList = talkers.filter((talker) => Number(talker.id) !== Number(id));

    fs.writeFileSync(talkerFile, JSON.stringify(newList));
    res.status(200).json({
      message: 'Pessoa palestrante deletada com sucesso',
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
