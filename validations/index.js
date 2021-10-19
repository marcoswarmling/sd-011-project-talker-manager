const checkToken = require('./validateToken');
const checkLogin = require('./validateLogin');
const checkName = require('./validateTalkerName');
const checkAge = require('./validateTalkerAge');
const checkTalk = require('./validateTalk');
const checkTalkKeys = require('./validateTalkKeys');

module.exports = { checkToken, checkLogin, checkName, checkAge, checkTalk, checkTalkKeys };
