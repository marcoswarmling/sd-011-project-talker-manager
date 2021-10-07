const fs = require('fs');
const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const validateLogin = require('./login');
const validateTalker = require('./validateTalker');

const list = './talker.json';

// Requisito 1 - GET com todos os talkers
router.get('/talker', (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync(list, 'utf-8'));
  res.status(200).json(talkers);
});

// O requisito 7 tem que ser colocado antes por causa do path /talker/:id que engloba o '/talker/search'
// Requisito 7 - Endpoint GET /talker/search?q=searchTerm
router.get('/talker/search',
  validateTalker.checkToken,
  (req, res) => {
  const { q } = req.query;
  const talkers = JSON.parse(fs.readFileSync(list, 'utf-8'));
  if (!q) return res.status(200).json(talkers);

  const foundTalkers = talkers.filter((talker) => talker.name.includes(q));

  res.status(200).json(foundTalkers);
});

// Requisito 2 - GET com endpoint /talker/:id
router.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync(list, 'utf-8'));
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
  validateTalker.checkToken,
  validateTalker.checkAge,
  validateTalker.checkName,
  validateTalker.checkTalk,
  (req, res) => {
    const talkers = JSON.parse(fs.readFileSync(list, 'utf-8'));
    const { name, age, talk } = req.body;
    const newId = talkers.length + 1;
    talkers.push({ id: newId, name, age, talk });

    fs.writeFileSync(list, JSON.stringify(talkers));

    res.status(201).json({ id: newId, name, age, talk });
  },
);

// Requisito 5 - Endpoint PUT /talker/:id
router.put(
  '/talker/:id',
  validateTalker.checkToken,
  validateTalker.checkAge,
  validateTalker.checkName,
  validateTalker.checkTalk,
  (req, res) => {
    const { id } = req.params;
    const talkers = JSON.parse(fs.readFileSync(list, 'utf-8'));
    const { name, age, talk } = req.body;

    const editTalker = talkers.filter((talker) => talker.id !== Number(id));

    editTalker.push({ id: Number(id), name, age, talk });

    fs.writeFileSync(list, JSON.stringify(editTalker));

    res.status(200).json({ id: Number(id), name, age, talk });
  },
);

// Requisito 6 - Endpoint DELETE /talker/:id
router.delete('/talker/:id', 
  validateTalker.checkToken,
  (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync(list, 'utf-8'));
  const leftTalkers = talkers.filter((talker) => talker.id !== Number(id));

  fs.writeFileSync(list, JSON.stringify(leftTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
