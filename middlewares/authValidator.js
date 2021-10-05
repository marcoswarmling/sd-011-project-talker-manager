const { isValid, getInvalidMessage } = require('../helpers/utils');

const authValidator = (req, res, next) => {
  const { authorization } = req.headers;

  if (!isValid('token', authorization)) {
    return res.status(401).json({ message: getInvalidMessage('token', authorization) });
  }

  next();
};

module.exports = authValidator;
