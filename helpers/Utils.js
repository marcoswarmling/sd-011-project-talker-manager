const regexGeneralEmail = {
  email: /[\w\d.+_-]+@[\w]+.com/,
  password: /(.){6,}/,
};

const emailFormatValidation = (regexType, value) => value && value
  .match(regexGeneralEmail[regexType]);

module.exports = { emailFormatValidation };