const express = require('express');
const fs = require('fs');
const { 
  validateName, 
  validateAge, 
  validateData, 
  validateTalk, 
  validateToken,
} = require('../middlewares/talkerMiddlewares');

const router = express.Router();

router.get('/', (req, res) => {
  const talker = fs.readFileSync('./talker.json');
  const parseTalk = JSON.parse(talker);
  res.status(200).json(parseTalk);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const talker = fs.readFileSync('./talker.json');
  const parseTalk = JSON.parse(talker);
  const person = parseTalk.find((el) => el.id === +id);
  
  if (!person) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(person);
});

router
.post('/', validateToken, validateName, validateAge, validateTalk, validateData, (req, res) => {
  const { name, age, talk } = req.body;
  const talker = JSON.parse(fs.readFileSync('./talker.json', { encoding: 'utf8' }));
  const nextId = talker.length + 1;
  
  talker.push({ id: nextId, name, age, talk });

  fs.writeFileSync('./talker.json', JSON.stringify(talker));
  return res.status(201).json({ id: nextId, name, age, talk });
});

module.exports = router;
