const router = require('express').Router();
const crypto = require('crypto');
const { isValidEmail, isValidPassword } = require('../middlewares/validations.js');

router.post('/login', isValidEmail, isValidPassword, (_req, res) =>
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') }));

module.exports = router;