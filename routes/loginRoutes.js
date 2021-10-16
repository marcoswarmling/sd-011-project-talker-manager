const express = require('express');
const Login = require('../middlewares/loginMiddlewares');

const Validations = require('../middlewares/validations');

const loginValidations = [
  Validations.isValidEmail,
  Validations.isValidPassword,
];

const router = express.Router();

router.post('/', loginValidations, Login.login);

module.exports = router;