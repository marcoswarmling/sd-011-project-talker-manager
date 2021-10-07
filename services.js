const fs = require('fs');
const crypto = require('crypto');

const missingMessages = {
  email: 'O campo "email" é obrigatório',
  password: 'O campo "password" é obrigatório',
  token: 'Token não encontrado',
  name: 'O campo "name" é obrigatório',
  age: 'O campo "age" é obrigatório',
  talk: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
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

const TALKER_PATH = './talker.json';

const readFileTalker = () => {
  try {
    const talkers = fs.readFileSync(TALKER_PATH, 'utf-8');
    return JSON.parse(talkers);
  } catch (err) {
    throw new Error(err);
  }
};

const writeFileTalker = (file) => {
  fs.writeFileSync(TALKER_PATH, JSON.stringify(file));
};

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function validateEmail(email) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const isValidEmail = regex.test(email);
  return isValidEmail;
}

function validatePassword(password) {
  const MIN_PW_LENGTH = 6;
  const isValidPassword = password && password.length >= MIN_PW_LENGTH;
  return isValidPassword;
}

function validateCredentials(email, password) {
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);
  if (!email) return ({ message: missingMessages.email });
  if (!isValidEmail) return ({ message: invalidMessages.email });
  if (!password) return ({ message: missingMessages.password });
  if (!isValidPassword) return ({ message: invalidMessages.password });
  return true;
}

function validateToken(token) {
  const TOKEN_LENGTH = 16;
  const isValidToken = token && token.length === TOKEN_LENGTH;
  return isValidToken;
}

function validateName(name) {
  const NAME_LENGTH = 3;
  const isValidName = name.length >= NAME_LENGTH;
  return isValidName;
}

function validateAge(age) {
  const MIN_AGE = 18;
  const isValidAge = age >= MIN_AGE && age % 1 === 0;
  return isValidAge;
}

function validateWatchedAt(date) {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const isValidWatchedAt = date && regex.test(date);
  return isValidWatchedAt;
}

function validateRate(rate) {
  const MAX_RATE = 5;
  const MIN_RATE = 1;
  const rateNumber = Number(rate);
  const isValidTalk = (
    rate && rateNumber <= MAX_RATE && rateNumber >= MIN_RATE && rateNumber % 1 === 0
  );
  return isValidTalk;
}

function validateTalk(talk) {
  const isValidTalk = (talk);
  if (!talk || !talk.watchedAt || !talk.rate) {
    return { message: missingMessages.talk };
  }
  return isValidTalk;
}

module.exports = {
  missingMessages,
  invalidMessages,
  readFileTalker,
  generateToken,
  validateToken,
  validateWatchedAt,
  validateRate,
  validateCredentials,
  validateAge,
  validateName,
  validateTalk,
  writeFileTalker,
};
