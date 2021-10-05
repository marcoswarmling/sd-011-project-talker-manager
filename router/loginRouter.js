const express = require('express');

const router = express.Router();
const emailValidation = require('../validation/emailValidation');
const passwordValidation = require('../validation/passwordValidation');

const loginValidations = [emailValidation, passwordValidation];

router.post('/', loginValidations, (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;