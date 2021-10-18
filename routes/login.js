const router = require('express').Router();
const crypto = require('crypto');

const { emailVerification, passwordVerification } = require('../middlewares/login.js');

router.post('/', emailVerification, passwordVerification, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;