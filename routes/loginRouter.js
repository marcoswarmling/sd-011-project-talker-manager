const router = require('express').Router();

const { 
  emailValidation,
  passwordValidation } = require('../middlewares/middlewares');

const { generateToken } = require('../utils/utils');

router.post(
  '/',
  emailValidation,
  passwordValidation,
  (_req, res) => {
    const token = generateToken();
    res.status(200).json({ token });
  },
);

module.exports = router;
