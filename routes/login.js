const express = require('express');
const loginController = require('../controllers/login');

const loginRouter = express.Router();

loginRouter.post(
  '/',
  loginController.validateEmail,
  loginController.validatePassword,
  loginController.createLoginToken,
);

module.exports = loginRouter;