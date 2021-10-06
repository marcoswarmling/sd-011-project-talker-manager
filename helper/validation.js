const checkEmail = (email) => {
  const testEmail = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;

  return testEmail.test(email);
};

const checkPassword = (password) => {
  if (password.length >= 6) return true;
};

module.exports = {
  checkEmail,
  checkPassword,
};
