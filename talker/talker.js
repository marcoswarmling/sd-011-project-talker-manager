const fs = require('fs');
const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const loginValidations = require('../validations/login');

// 1
router.get('/talker', (_req, res) => {
  const response = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

  if (!response) {
    return res.status(200).json([]);
  }

  res.status(200).json(response);
});

// 2
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

// 3
router.post(
  '/login',
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    
    res.status(200).json({ token });
  },
);

module.exports = router;
