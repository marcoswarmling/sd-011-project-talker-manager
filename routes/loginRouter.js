const express = require('express');
const { generateToken } = require('../helpers/utils');
const loginValidator = require('../middlewares/loginValidator');

const loginRouter = express.Router();

const TOKEN_LENGTH = 16;
const BYTES_QUANTITY = TOKEN_LENGTH / 2;

loginRouter.post(
  '/',
  loginValidator,
  (_req, res) => {
    const token = generateToken(BYTES_QUANTITY);

    return res.status(200).json({ token });
  },
);

module.exports = loginRouter;
