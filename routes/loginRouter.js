const express = require('express');
const { validateEmail, validatePassword } = require('../helpers/validateUser.js');

const loginRouter = express.Router();

loginRouter.post('/', 
(req, res, next) => {
  const { email } = req.body;
  
  if (!email || email === '') {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }

  if (!validateEmail(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
},
(req, res, next) => {
  const { password } = req.body;
  const minLength = 6;

  if (!password || password === '') {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }

  if (validatePassword(password, minLength)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
},
(_req, res) => res.status(200).send({ token: '7mqaVRXJSp886CGr' }));

module.exports = loginRouter;