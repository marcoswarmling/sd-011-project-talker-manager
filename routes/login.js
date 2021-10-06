const express = require('express');

const router = express.Router(); 

// ref: https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
function tokenGenerator(size) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';

  for (let i = 0; i < size; i += 1) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }

  return { token };
}

function verifyEmail(email) {
  const emailChek = email.split('').includes('@') && email.split('.').includes('com');
  return emailChek;
}

function checkBody(email, password) {
  const passCheck = password.length > 6;

  if (!email) return { message: 'O campo "email" é obrigatório' }; 
  if (!verifyEmail(email)) return { message: 'O "email" deve ter o formato "email@email.com"' }; 
  if (!password) return { message: 'O campo "password" é obrigatório' };
  if (!passCheck) return { message: 'O "password" deve ter pelo menos 6 caracteres' };
}

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const errorValidate = checkBody(email, password);
  if (!errorValidate) {
    return res.status(200).json(tokenGenerator(16));
  }
  return res.status(404).json(errorValidate);
});

module.exports = router;
