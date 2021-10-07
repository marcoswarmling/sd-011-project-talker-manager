const { Router } = require('express');

const {
  hasEmail,
  validateEmail,
  hasPassword,
  validatePassword,
} = require('../middlewares/validateLogin.js');

const router = Router();

const validations = [hasEmail, validateEmail, hasPassword, validatePassword];

router.post('/', validations, (req, res) => {
  const token = '7mqaVRXJSp886CGr';
  if (token) return res.status(200).json({ token });
  const { email, password } = req.body;
  console.log(`email: ${email}, senha: ${password}`);
  if (email && password) return res.status(200).json({ email, password });
});

module.exports = router;