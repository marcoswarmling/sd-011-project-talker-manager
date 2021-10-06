function validatePassword(password) {
  const pwdLength = { message: 'O "password" deve ter pelo menos 6 caracteres' };
  const emptyPwd = { message: 'O campo "password" é obrigatório' };

  if (!password) return emptyPwd;
  if (password.length < 6) return pwdLength;
  return null;
}

module.exports = validatePassword;
