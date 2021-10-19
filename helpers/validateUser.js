function validateEmail(email) {
  const emailRegex = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
  return (emailRegex.test(email));
}

function validatePassword(password, minLength) {
  return (password.length >= minLength);
}

module.exports = { validateEmail, validatePassword };