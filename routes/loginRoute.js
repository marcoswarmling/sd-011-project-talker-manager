// Requisito 3
const express = require('express');
const { validatePassword, validateEmail, generateToken } = require('../middleware/loginValidation');

const loginRoute = express.Router();

loginRoute.post('/', validateEmail, validatePassword, (req, res) => {
  res.status(200).json({ token: generateToken(16) });
});

module.exports = loginRoute; 