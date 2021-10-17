const express = require('express');
const { passwordd, emaill, generateToken } = require('../routes/loginRoutes.js');

const loginRoute = express.Router();

loginRoute.post('/', emaill, passwordd, (_req, res) => {
  res.status(200).json({ token: generateToken(16) });
});

module.exports = loginRoute;  