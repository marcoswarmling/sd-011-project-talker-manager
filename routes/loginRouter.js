const express = require('express');
const crypto = require('crypto');

const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();

const validate = [validateEmail, validatePassword];

router.post('/', validate, (_req, res) =>
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') }));

module.exports = router;
