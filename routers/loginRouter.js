const express = require('express');
const rescue = require('express-rescue');
const { validateEmail, validatePassword } = require('../helpers');

const loginRouter = express();
loginRouter.use(express.json());

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
