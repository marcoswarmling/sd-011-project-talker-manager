const router = require('express').Router();

const validateEmail = require('../validate/validationEmail');
const validatePassword = require('../validate/validatePassword');

const validateLogin = [validateEmail, validatePassword];

router.post('/', validateLogin, (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;
