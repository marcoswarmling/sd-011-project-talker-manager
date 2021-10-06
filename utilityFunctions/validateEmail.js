function validateEmail(email) {
  const validRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
  );
  const validEmail = validRegex.test(email);
  const emptyEmail = { message: 'O campo "email" é obrigatório' };
  const wrongEmail = { message: 'O "email" deve ter o formato "email@email.com"' };

  if (!email) return emptyEmail;
  if (!validEmail) return wrongEmail;
  return null;
}

module.exports = validateEmail;
