const express = require('express');
const { validatePassword, validateEmail, generateToken } = require('../data/userData');

const loginRoute = express.Router();

loginRoute.post('/', validateEmail, validatePassword, (req, res) => {
  res.status(200).json({ token: generateToken(16) });
});

module.exports = loginRoute; 
