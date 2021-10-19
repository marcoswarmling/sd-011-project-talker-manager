const talkerRouter = require('express').Router();
const crypto = require('crypto');
const { isValidEmail, isValidPassword } = require('../managers/Managers');

talkerRouter.post('/', isValidEmail, isValidPassword, (_req, res) =>
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') }));

module.exports = talkerRouter;