const routerLogin = require('express').Router();
const { generateToken, emailValidate, passwordValidate } = require('../middleware/validationLogin');

routerLogin.post('/', emailValidate, passwordValidate, (_req, res) => {
  res.status(200).json({ token: generateToken(16) });
});

module.exports = routerLogin;