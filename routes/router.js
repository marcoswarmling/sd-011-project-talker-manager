const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
} = require('../validation');

const talkersPath = './talker.json';

const router = express.Router();

router.get('/talker', (_req, res) => {
  const file = JSON.parse(fs.readFileSync(talkersPath, 'utf-8'));
  if (!file) return res.status(200).json([]);

  res.status(200).json(file);
});

router.get('/talker/search', validateToken, (req, res) => {
  const { q } = req.query;
  const file = JSON.parse(fs.readFileSync(talkersPath, 'utf-8'));
    
  if (!q) return res.status(400).json(file);

  const filteredByTerm = file.filter((talker) => talker.name.includes(q));

  res.status(200).json(filteredByTerm);
});

router.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(fs.readFileSync(talkersPath, 'utf-8'));
  const talker = file.find((person) => person.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  res.status(200).json(talker);
});

router.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token });
});

router.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  (req, res) => {
    const { name, age, talk } = req.body;
    const file = JSON.parse(fs.readFileSync(talkersPath, 'utf-8'));
    const talker = { id: file.length + 1, name, age, talk };

    file.push(talker);
    fs.writeFileSync(talkersPath, JSON.stringify(file));

    res.status(201).json(talker);
},
);

router.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const file = JSON.parse(fs.readFileSync(talkersPath, 'utf-8'));

    const talker = { id: Number(id), name, age, talk };

    file[id - 1] = talker;
    fs.writeFileSync(talkersPath, JSON.stringify(file));

    res.status(200).json(talker);
},
);

router.delete('/talker/:id', validateToken, (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(fs.readFileSync(talkersPath, 'utf-8'));

  const filteredTalkers = file.filter((talker) => talker.id !== Number(id));
  fs.writeFileSync(talkersPath, JSON.stringify(filteredTalkers));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
