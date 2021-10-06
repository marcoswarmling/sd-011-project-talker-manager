// Requisito 3
const express = require('express');

const router = express.Router();

const {
  verifyEmailExists,
  verifyEmailisValid,
  verifyPasswordExists,
  verifyPasswordIsValid,
  generateToken,
} = require('../middlewares/validateLogin');

const loginValidations = [
  verifyEmailExists,
  verifyEmailisValid,
  verifyPasswordExists,
  verifyPasswordIsValid];

router.post('/', loginValidations, (_req, res) => {
  res.status(200).json({ token: generateToken() }); // Espera retornar o token.
});

module.exports = router;
