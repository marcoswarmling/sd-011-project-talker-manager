const router = require('express').Router();
// const fs = require('fs').promises;
const rescue = require('express-rescue');
const crypto = require('crypto');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

router.post('/', validateEmail, validatePassword, rescue((_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token });
}));

module.exports = router;