const { isValid, getInvalidMessage } = require('../helpers/utils');

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!isValid('email', email)) {
    return res.status(400).json({ message: getInvalidMessage('email', email) });
  }

  if (!isValid('password', password)) {
    return res.status(400).json({ message: getInvalidMessage('password', password) });
  }

  next();
};

module.exports = loginValidator;
