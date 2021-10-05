const router = require('express').Router();
const crypto = require('crypto');
const {
  isValidEmail,
  isValidPassword,
} = require('../middlewares/validations');

router.post('/', isValidEmail, isValidPassword, (_req, res) => {
    const token = crypto.randomBytes(32).toString('hex');
    res.status(200).json({ token });
  }); 

module.exports = router;