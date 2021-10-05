const router = require('express').Router();
const { generateToken } = require('../helpers/services');
const { validateEmail, validatePassword } = require('../middleware/validations');

router.post('/', validateEmail, validatePassword, (req, res) => {
  const token = generateToken(16);
  res.status(200).json({ token });
});

module.exports = router;
