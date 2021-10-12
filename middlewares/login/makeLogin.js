const {
  validationEmail,
  validationPassword,
 } = require('../../utils/validationLogin');
const generationToken = require('../../utils/generationToken');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    validationEmail(email);
    validationPassword(password);
    const token = generationToken();
    return res.status(200).json({ token });
  } catch (err) {
    if (err.statusCode) {
      const { status, message } = err.statusCode;
      next({ status, message });
    }

    next({ status: 500, message: err });
  }
};

module.exports = login;
