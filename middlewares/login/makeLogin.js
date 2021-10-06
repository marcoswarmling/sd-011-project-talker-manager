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
    next({ status: 400, message: err });
  }
};

module.exports = login;
