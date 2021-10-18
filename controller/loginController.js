const express = require('express');
const { randomBytes } = require('crypto');
const { validateData } = require('../middlewares/validationsMiddleware');
const { validateEmail } = require('../helper/validationHelpers');

const router = express.Router();

router.post('/', validateData, (req, res) => {
  const { email, password } = req.body;
  const checkEmail = validateEmail(email);
  if (!checkEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token: randomBytes(8).toString('hex') });
});

module.exports = router;
