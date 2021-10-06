const express = require('express');
const rescue = require('express-rescue');
const { validateLogin } = require('../helpers');

const loginRouter = express();
loginRouter.use(express.json());

loginRouter.post('/', rescue(validateLogin));

module.exports = loginRouter;
