const express = require('express');

const router = express.Router();
const randomToken = require('random-token');
const { validedEmail, validedPassword } = require('../middlewares/loginMiddle');

router.post('/login', validedEmail, validedPassword, (_req, res) => {
  const token = randomToken(16);
  return res.status(200).json({ token });
});

module.exports = router;
