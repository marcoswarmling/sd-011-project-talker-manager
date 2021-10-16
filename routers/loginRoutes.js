const router = require('express').Router();
const crypto = require('crypto');

const { validateEmail, validatePassword } = require('../middlewares/loginValidate');

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

module.exports = router;
