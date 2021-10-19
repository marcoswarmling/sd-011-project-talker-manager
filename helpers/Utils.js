const regexGeneralEmail = {
  email: /[\w\d.+_-]+@[\w]+.com/,
  password: /(.){6,}/,
};

const regexTalker = {
  token: /[\w\d]{16}/,
  name: /[\w]{3,}/,
  watchedAt: /[\d]{2}\/[\d]{2}\/[\d]{4}/,
};

const talkerFormatValidation = (regexType, value) => value && value
  .match(regexTalker[regexType]);

const emailFormatValidation = (regexType, value) => value && value
  .match(regexGeneralEmail[regexType]);

module.exports = { emailFormatValidation, talkerFormatValidation };