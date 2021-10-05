const fs = require('fs');
const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const loginValidations = require('../validations/login');
const talkerValidations = require('../validations/talker');

// 1 - Crie o endpoint GET /talker
router.get('/talker', (_req, res) => {
  const response = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

  if (!response) {
    return res.status(200).json([]);
  }

  res.status(200).json(response);
});

// 2 - Crie o endpoint GET /talker/:id
router.get('/talker/:id', (req, res) => {
  const response = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const { id } = req.params;
  const findTalker = response.find((talker) => talker.id === Number(id));

  if (!findTalker) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(findTalker);
});

// 3 - Crie o endpoint POST /login
router.post(
  '/login',
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');

    res.status(200).json({ token });
  },
);

// 4 - Crie o endpoint POST /talker
router.post(
  '/talker',
  talkerValidations.validateToken,
  talkerValidations.validateAge,
  talkerValidations.validateName,
  talkerValidations.validateTalk,
  (req, res) => {
    const response = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
    const { name, age, talk } = req.body;

    const newId = Math.max(...response.map((talker) => talker.id)) + 1;
    response.push({ id: newId, name, age, talk });

    fs.writeFileSync('./talker.json', JSON.stringify(response));

    res.status(201).json({ id: newId, name, age, talk });
  },
);

module.exports = router;
