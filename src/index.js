const error = require('./error');
const addTalker = require('./addTalker');
const { login, 
    validName,
    validAge,
    validTalk,
    validaData,
    validRate,
    generateToken,
    isValidToken } = require('./login');

module.exports = {
  addTalker,
  error,
  login,
  validName,
  validAge,
  validTalk,
  validaData,
  validRate,
  generateToken,
  isValidToken,
};
