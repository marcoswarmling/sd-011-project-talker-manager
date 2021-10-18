const router = require('express').Router();
const { generateToken } = require('../services/generateToken');
const { isValidEmail, isValidPassword } = require('../middlewares/loginMiddleware');

router.post('/', isValidEmail, isValidPassword, (_req, res) => {
  const token = generateToken(16);
  res.status(200).json({ token });
});

module.exports = router;