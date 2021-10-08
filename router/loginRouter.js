const { Router } = require('express');

const router = Router();

const validation = require('./validation');

const HTTP_OK_STATUS = 200;

const Validations = [
  validation.emailExists,
  validation.validateEmail,
  validation.passwordExists,
  validation.validatePassword,
];

router.post('/', Validations, (_request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: validation.tokenGenerator() });
});

module.exports = router;