const emailValidate = (email) => {
  const regexEmail = /^([\w]+)@([\w]+\.)+([\w]{2,})/i;
  if (regexEmail !== email) return false;

  return true;
};

module.exports = emailValidate;
