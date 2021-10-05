const express = require('express');
const { generateToken, isValid, getInvalidMessage } = require('../helpers/utils');

const loginRouter = express.Router();

const TOKEN_LENGTH = 16;
const BYTES_QUANTITY = TOKEN_LENGTH / 2;

loginRouter.post('/', ({ body: { email, password } }, res) => {
  if (!isValid('email', email)) {
    return res.status(400).json({ message: getInvalidMessage('email', email) });
  }

  if (!isValid('password', password)) {
    return res.status(400).json({ message: getInvalidMessage('password', password) });
  }

  const token = generateToken(BYTES_QUANTITY);

  return res.status(200).json({ token });
});

module.exports = loginRouter;
