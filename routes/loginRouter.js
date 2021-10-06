const express = require('express');
const crypto = require('crypto');

const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();

router.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = crypto.randomBytes(16).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;