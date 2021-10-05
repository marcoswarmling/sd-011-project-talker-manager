const express = require('express');
const rescue = require('express-rescue');
const validator = require('email-validator');
 
const loginRouter = express();
loginRouter.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;

const loginErrorMessages = {
  emptyEmail: 'O campo "email" é obrigatório', 
  wrongEmail: 'O "email" deve ter o formato "email@email.com"',
  emptyPassword: 'O campo "password" é obrigatório',
  wrongPassword: 'O "password" deve ter pelo menos 6 caracteres',
};

function validateEmail(email) {
  const { emptyEmail, wrongEmail } = loginErrorMessages;
  if (!email || email === '') {
    return { status: HTTP_BAD_REQUEST_STATUS, message: { message: emptyEmail } };
  }
  if (!validator.validate(email)) {
    return { status: HTTP_BAD_REQUEST_STATUS, message: { message: wrongEmail } };
  }
  return { status: 'emailValid' };
}

function validatePassword(password) {
  const { emptyPassword, wrongPassword } = loginErrorMessages;
  if (!password || password === '') {
    return { status: HTTP_BAD_REQUEST_STATUS, message: { message: emptyPassword } };
  }
  if (password.length < 6) {
    return { status: HTTP_BAD_REQUEST_STATUS, message: { message: wrongPassword } };
  }
  return { status: HTTP_OK_STATUS, message: { token: '7mqaVRXJSp886CGr' } };
}

loginRouter.post('/', rescue((request, response) => {
  const { email, password } = request.body;
  const { status: emailStatus, message: emailMessage } = validateEmail(email);
  if (emailStatus === 'emailValid') {
    const { status: passwordStatus, message: passwordMessage } = validatePassword(password);
    return response.status(passwordStatus).json(passwordMessage);
  }
  response.status(emailStatus).json(emailMessage);
}));

module.exports = loginRouter;
