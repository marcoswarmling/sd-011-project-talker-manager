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
// const { response } = require('express');

const router = express.Router();

router.get('/talker', (_req, res) => {
  const file = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  if (!file) return res.status(200).json([]);

  res.status(200).json(file);
});

router.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
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
    const file = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
    const { name, age, talk } = req.body;

    file.push(({ id: file.length + 1, name, age, talk }));
    fs.writeFileSync('./talker.json', JSON.stringify(file));

    res.status(201).json({ id: file.length, name, age, talk });
},
);

module.exports = router;
