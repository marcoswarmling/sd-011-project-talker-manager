const routes = require('express').Router();
const crypto = require('crypto');
const loginValidation = require('../Helpers/loginValidation');

const HTTP_OK_STATUS = 200;

routes.post('/', loginValidation, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = routes;