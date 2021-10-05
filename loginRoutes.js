const express = require('express');

const router = express.Router();

function generateToken(length) {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
}

function validateEmailFormat(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateEmailExistence(email) {
  return email !== '' && email;
}

function validatePasswordLength(pass) {
  return pass.length >= 6;
}

function validatePasswordExistence(pass) {
  return pass !== '' && pass;
}

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!validateEmailExistence(email)) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmailFormat(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!validatePasswordExistence(password)) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validatePasswordLength(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token: generateToken(16) });
});

module.exports = router;
