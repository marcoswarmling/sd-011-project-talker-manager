const ERROR_MESSAGES = {
  // EMAIL
  REQUIRED_EMAIL: 'O campo "email" é obrigatório',
  INVALID_EMAIL_FORMAT: 'O "email" deve ter o formato "email@email.com"',

  // PASSWORD
  REQUIRED_PASSWORD: 'O campo "password" é obrigatório',
  INVALID_PASSWORD_LENGTH: 'O "password" deve ter pelo menos 6 caracteres',

  // TOKEN
  TOKEN_NOT_FOUND: 'Token não encontrado',
  INVALID_TOKEN: 'Token inválido',

  // NAME
  REQUIRED_NAME: 'O campo "name" é obrigatório',
  INVALID_NAME_LENGTH: 'O "name" deve ter pelo menos 3 caracteres',

  // AGE
  REQUIRED_AGE: 'O campo "age" é obrigatório',
  NOT_OF_LEGAL_AGE: 'A pessoa palestrante deve ser maior de idade',

  // TALK
  REQUIRED_TALK: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',

  // WATCHED_AT
  INVALID_DATE_FORMAT: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',

  // RATE
  INVALID_RATE: 'O campo "rate" deve ser um inteiro de 1 à 5',

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

  requiredField: (field, next, status, err) => {
    if (!field || field === '') {
      return next({ status, message: err });
    }
  },

  validLength: ({ field, length, next, status, err }) => {
    if (field.length < length) {
      return next({ status, message: err });
    }
  },

  isOfLegalAge: (age, next, status, err) => {
    if (parseInt(age, 10) < 18) {
      return next({ status, message: err });
    }
  },

  checkTalk: (talk, next, status, err) => {
    if ((!talk) || (!talk.watchedAt) || (!talk.rate && talk.rate !== 0)) {
      return next({ status, message: err });
    }
  },

  validDate: (watchedAt, next, status, err) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(watchedAt)) {
      return next({ status, message: err });
    }
  },

  validRate: (rate, next, status, err) => {
    if ((parseInt(rate, 10) < 1) || (parseInt(rate, 10) > 5)) {
      return next({ status, message: err });
    } 
  },
};

module.exports = {
  ERROR_MESSAGES,
  CHECKERS,
};
