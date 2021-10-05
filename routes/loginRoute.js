const express = require('express');
const { validateEmail, validatePassword } = require('../middlewares/validateCredentials');
const generateRandomToken = require('../utils/generateRandomToken');

const router = express.Router();

router.post(
  '/',
  validateEmail,
  validatePassword,
  (_req, res) => {
    const token = generateRandomToken();

    res.status(200).json({ token });
  },
);

module.exports = router;
