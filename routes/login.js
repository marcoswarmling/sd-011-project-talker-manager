// Requisito 3 pt2
const express = require('express');

const router = express.Router();

const { checkEmail, checkPassword } = require('../midlewares/validateLogin');

const loginIsValid = [checkEmail, checkPassword];

function generateToken() {
  return (
    Math.random().toString(36).substring(2, 15)
    + Math.random().toString(36).substring(2, 15)
  ).substr(0, 16);
}

router.post('/', loginIsValid, (req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = router;
