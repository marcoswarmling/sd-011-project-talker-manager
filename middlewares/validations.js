const { ERROR_MESSAGES, CHECKERS } = require('../helpers');

function isValidEmail(req, res, next) {
  const { email } = req.body;
  const emailValidation = CHECKERS.emailCheck(email);
  
  if (!email || email === '') return next({ status: 400, message: ERROR_MESSAGES.REQUIRED_EMAIL });
  if (!emailValidation) return next({ status: 400, message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT });

  return next();
}

function isValidPassword(req, _res, next) {
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

function isValidToken(req, _res, next) {
  const { authorization } = req.headers;
  if (!authorization || authorization === '') {
    return next({ status: 401, message: ERROR_MESSAGES.TOKEN_NOT_FOUND });
  }
  if (authorization.length !== 16) {
    return next({ status: 401, message: ERROR_MESSAGES.INVALID_TOKEN });
  }

  return next();
}

function isValidName(req, _res, next) {
  const { name } = req.body;
  CHECKERS.requiredField(name, next, 400, ERROR_MESSAGES.REQUIRED_NAME);
  CHECKERS.validLength({
    field: name,
    length: 3,
    next,
    status: 400,
    err: ERROR_MESSAGES.INVALID_NAME_LENGTH,
  });
  return next();
}

function isValidAge(req, _res, next) {
  const { age } = req.body;
  CHECKERS.requiredField(age, next, 400, ERROR_MESSAGES.REQUIRED_AGE);
  CHECKERS.isOfLegalAge(age, next, 400, ERROR_MESSAGES.NOT_OF_LEGAL_AGE);
  return next();
}

function isValidTalk(req, _res, next) {
  const { talk } = req.body;
  CHECKERS.checkTalk(talk, next, 400, ERROR_MESSAGES.REQUIRED_TALK);
  return next();
}

function isValidWatchedAt(req, _res, next) {
  const { talk: { watchedAt } } = req.body;
  CHECKERS.validDate(watchedAt, next, 400, ERROR_MESSAGES.INVALID_DATE_FORMAT);
  return next();
}

function isValidRate(req, _res, next) {
  const { talk: { rate } } = req.body;
  CHECKERS.validRate(rate, next, 400, ERROR_MESSAGES.INVALID_RATE);
  return next();
}

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
};
