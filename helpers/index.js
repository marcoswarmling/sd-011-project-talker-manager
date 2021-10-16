const ERROR_MESSAGES = {
  // EMAIL
  REQUIRED_EMAIL: 'O campo "email" é obrigatório',
  INVALID_EMAIL_FORMAT: 'O "email" deve ter o formato "email@email.com"',

  // PASSWORD
  REQUIRED_PASSWORD: 'O campo "password" é obrigatório',
  INVALID_PASSWORD_LENGTH: 'O "password" deve ter pelo menos 6 caracteres',
};

const CHECKERS = {
  emailCheck: (email) => {
    const pattern = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const isValidEmail = pattern.test(email);

    return isValidEmail;
  },

  passwordCheck: (password) => {
    const requiredLength = 6;
    const isValidPassword = password ? password.length >= requiredLength : false;

    return isValidPassword;
  },
};

module.exports = {
  ERROR_MESSAGES,
  CHECKERS,
};
