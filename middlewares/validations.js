const { ERROR_MESSAGES, CHECKERS } = require('../helpers');

function isValidEmail(req, res, next) {
  const { email } = req.body;
  const emailValidation = CHECKERS.emailCheck(email);
  
  if (!email || email === '') return next({ status: 400, message: ERROR_MESSAGES.REQUIRED_EMAIL });
  if (!emailValidation) return next({ status: 400, message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT });

  return next();
}

function isValidPassword(req, res, next) {
  const { password } = req.body;
  const passwordValidation = CHECKERS.passwordCheck(password);
  
  if (!password || password === '') {
    return next({ status: 400, message: ERROR_MESSAGES.REQUIRED_PASSWORD });
  }
  if (!passwordValidation) {
    return next({ status: 400, message: ERROR_MESSAGES.INVALID_PASSWORD_LENGTH });
  }

  return next();
}

module.exports = {
  isValidEmail,
  isValidPassword,
};
