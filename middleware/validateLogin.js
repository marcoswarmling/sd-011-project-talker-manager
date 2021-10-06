const validateEmail = require('../utilityFunctions/validateEmail');
const validatePassword = require('../utilityFunctions/validatePassword');

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const validatedEmail = validateEmail(email);
  const validatedPwd = validatePassword(password);

  if (validatedEmail !== null) return res.status(400).json(validatedEmail);
  if (validatedPwd !== null) return res.status(400).json(validatedPwd);

  next();
}

module.exports = validateLogin;
