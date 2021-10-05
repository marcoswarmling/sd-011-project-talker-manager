const crypto = require('crypto');

const generateToken = (bytesQuantity) => crypto.randomBytes(bytesQuantity).toString('hex');

const types = {
  email: /[\w\d.+_-]+@[\w]+.com/,
  password: /(.){6,}/,
};

const isValid = (type, value) => value && value.match(types[type]);

const getInvalidMessage = (type, value) => {
  const emptyMessages = {
    email: 'O campo "email" é obrigatório',
    password: 'O campo "password" é obrigatório',
  };

  const invalidMessages = {
    email: 'O "email" deve ter o formato "email@email.com"',
    password: 'O "password" deve ter pelo menos 6 caracteres',
  };

  return value
    ? invalidMessages[type]
    : emptyMessages[type];
};

module.exports = { generateToken, isValid, getInvalidMessage };
