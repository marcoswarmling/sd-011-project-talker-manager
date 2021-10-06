const express = require('express');
const crypto = require('crypto');
const m = require('./middleware/index');

const router = express.Router();

const token = () => crypto.randomBytes(8).toString('hex');

router.post('/', m.emailVerify, m.passwordVerify, (_request, response) => {
  try {
    return response.status(200).json({ token: token() });
  } catch (error) {
    return response.status(400).json(error);
  }
});

module.exports = router;
