const router = require('express').Router();
const fs = require('fs');
const validateTalk = require('../middlewares/validateTalk');
const validateTalkObject = require('../middlewares/validateTalkObject');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateToken = require('../middlewares/validateToken');
const validateFields = require('../middlewares/validateFields');
const validateRate = require('../middlewares/validateRate');

const talkerFile = './talker.json';

router.get('/talker', (_req, res) => {
  try {
    const talkers = fs.readFileSync(talkerFile, 'utf8');
    res.status(200).json(JSON.parse(talkers));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/talker/search', validateToken, (req, res) => {
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

router.get('/talker/:id', (req, res) => {
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

router.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateFields,
  validateTalkObject,
  (req, res) => {
    const { name, age, talk } = req.body;

    try {
      const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
      const lastTalker = talkers[talkers.length - 1];
      const newTalker = { name, age, talk, id: Number(lastTalker.id) + 1 };
      talkers.push(newTalker);

      fs.writeFileSync(talkerFile, JSON.stringify(talkers));
      res.status(201).json(newTalker);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

router.put('/talker/:id',
  validateToken,
  validateName, 
  validateAge,
  validateTalk,
  validateRate,
  validateFields,
  validateTalkObject, (req, res) => {
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

router.delete('/talker/:id', validateToken, (req, res) => {
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
