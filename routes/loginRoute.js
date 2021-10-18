const express = require('express');
const { emaill, passwordd, generateToken } = require('../middlewares/loginMiddlewares');

const loginRoutes = express.Router();

loginRoutes.post('/', emaill, passwordd, (_req, res) => {
  res.status(200).json({ token: generateToken(16) });
});

module.exports = loginRoutes;  