const emailValidate = (email) => {
  const regexEmail = /^([\w]+)@([\w]+\.)+([\w]{2,})/i;
  if (regexEmail.test(email)) return false;

  return true;
};

module.exports = emailValidate;
