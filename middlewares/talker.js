const fs = require('fs');
const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const validateLogin = require('./login');
const validateNewTalker = require('./newTalker');

// Requisito 1 - GET com todos os talkers
router.get('/talker', (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  res.status(200).json(talkers);
});

// Requisito 2 - GET com endpoint /talker/:id
router.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const chosenTalker = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!chosenTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(chosenTalker);
});

// Requisito 3 - Endpoint POST /login
router.post('/login', validateLogin.checkEmail, validateLogin.checkPassword, (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ token });
  });

// Requisito 4 - Endpoint POST /talker
router.post(
  '/talker',
  validateNewTalker.checkToken,
  validateNewTalker.checkAge,
  validateNewTalker.checkName,
  validateNewTalker.checkTalk,
  (req, res) => {
    const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
    const { name, age, talk } = req.body;
    const newId = talkers.length + 1;
    talkers.push({ id: newId, name, age, talk });

    fs.writeFileSync('./talker.json', JSON.stringify(talkers));

    res.status(201).json({ id: newId, name, age, talk });
  },
);

module.exports = router;
