const validateLogin = require('./loginValidator');
const talkerValidators = require('./talkerValidators');

module.exports = { validateLogin, ...talkerValidators };
