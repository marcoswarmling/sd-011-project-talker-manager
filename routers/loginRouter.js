const express = require('express');

const router = express.Router();
const randomToken = require('random-token');
const { validateEmail, validatePassword } = require('../middlewares/validations');

router.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = randomToken(16);
  return res.status(200).json({ token });
});

module.exports = router;