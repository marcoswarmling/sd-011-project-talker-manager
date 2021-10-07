const router = require('express').Router();
const crypto = require('crypto');
const existsEmailPassword = require('../middlewares/existsEmailPassword');
const regexEmailPassword = require('../middlewares/regexEmailPassword');

let randomToken = '';

router.post('/', existsEmailPassword, regexEmailPassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  randomToken = token;
  res.status(200).json({ randomToken });
});

module.exports = { 
  router,
  randomToken, 
};
