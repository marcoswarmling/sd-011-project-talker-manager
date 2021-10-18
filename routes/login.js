const router = require('express').Router();
const crypto = require('crypto');

const { emailVerification, passwordVerification } = require('../middlewares/login.js');

const generateToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};
router.post('/', emailVerification, passwordVerification, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

module.exports = router;
