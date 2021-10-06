const express = require('express');
const crypto = require('crypto');

const router = express.Router();

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const validateCredentials = require('./validateCredentials');

router.post('/', (_req, res) => {
  const getToken = generateToken();

  validateCredentials();
  return res.status(200).json({ token: getToken });
});

module.exports = router;