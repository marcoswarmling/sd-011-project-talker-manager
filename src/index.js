const error = require('./error');
const addTalker = require('./addTalker');
const login = require('./login');
const scanToken = require('./scanToken');
const validName = require('./validName');
const validAge = require('./validAge');
const validDate = require('./validDate');
const validRate = require('./validRate');
const validTalk = require('./validTalk');
const registerTalker = require('./registerTalker');

module.exports = {
  addTalker,
  error,
  login,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  scanToken,
  registerTalker,
};
