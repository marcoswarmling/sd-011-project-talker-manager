const passwordValidate = (password) => {
const passwordRegex = /^(\w{6,})/i;

  if (!passwordRegex.test(password)) return false;

  return true;
};

module.exports = passwordValidate;
