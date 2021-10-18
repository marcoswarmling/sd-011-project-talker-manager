function checkEmail(email) {
  const regexCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regexCheck.test(email);
}

module.exports = { checkEmail };
