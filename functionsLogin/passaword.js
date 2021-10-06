const passawordValidate = (password) => {
const passwordRegexCheck = /^(\w{6,})/i;

  if (!passwordRegexCheck.test(password)) return false;

  return true;
};

module.exports = passawordValidate;
