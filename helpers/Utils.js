const regexGeneralEmail = {
  email: /[\w\d.+_-]+@[\w]+.com/,
  password: /(.){6,}/,
};

const regexTalker = {
  token: /[\w\d]{16}/,
  name: /[\w]{3,}/,
  age: /([1][8-9]|[2-9][\d]|[1][\d]{2})/,
  watchedAt: /[\d]{2}\/[\d]{2}\/[\d]{4}/,
  rate: /^([1-5])$/,
};

const talkerFormatValidation = (regexType, value) => value && value
  .toString(regexTalker[regexType]);

const emailFormatValidation = (regexType, value) => value && value
  .match(regexGeneralEmail[regexType]);

module.exports = { emailFormatValidation, talkerFormatValidation };