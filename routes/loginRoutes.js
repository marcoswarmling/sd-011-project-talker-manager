const router = require('express').Router();
const crypto = require('crypto');
const existsEmailPassword = require('../middlewares/existsEmailPassword');
const regexEmailPassword = require('../middlewares/regexEmailPassword');

router.post('/', existsEmailPassword, regexEmailPassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token: `${token}` });
});

module.exports = { 
  router,
};
