const express = require('express');
const crypto = require('crypto');

const valEmail = require('../middlewares/email');
const valPassword = require('../middlewares/password');

const router = express.Router();

router.post('/', valEmail, valPassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;