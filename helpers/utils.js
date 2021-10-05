const crypto = require('crypto');

const generateToken = (bytesQuantity) => crypto.randomBytes(bytesQuantity).toString('hex');

const types = {
  email: /[\w\d.+_-]+@[\w]+.com/,
  password: /(.){6,}/,
  token: /[\w\d]{16}/,
  name: /[\w]{3,}/,
  age: /([1][8-9]|[2-9][\d]|[1][\d]{2})/,
  watchedAt: /[\d]{2}\/[\d]{2}\/[\d]{4}/,
  rate: /^([1-5])$/,
};

const isValid = (type, value) => value && value.toString().match(types[type]);

const emptyMessages = {
  email: 'O campo "email" é obrigatório',
  password: 'O campo "password" é obrigatório',
  token: 'Token não encontrado',
  name: 'O campo "name" é obrigatório',
  age: 'O campo "age" é obrigatório',
  watchedAt: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  rate: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const invalidMessages = {
  email: 'O "email" deve ter o formato "email@email.com"',
  password: 'O "password" deve ter pelo menos 6 caracteres',
  token: 'Token inválido',
  name: 'O "name" deve ter pelo menos 3 caracteres',
  age: 'A pessoa palestrante deve ser maior de idade',
  watchedAt: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  rate: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const getInvalidMessage = (type, value) => (value
    ? invalidMessages[type]
    : emptyMessages[type]);

module.exports = { generateToken, isValid, getInvalidMessage };
