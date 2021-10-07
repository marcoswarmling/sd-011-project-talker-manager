const fs = require('fs');
const crypto = require('crypto');

const TALKER = 'talker.json';

const talkerDataMiddleware = (req, res, next) => {
  const data = JSON.parse(fs.readFileSync(TALKER, 'utf8'));
  req.data = data;
  next();
};

const authEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!regex.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const authPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

const isEmptyObject = (object) => (Object.values(object).length <= 0);

const checkTalk = (talk) => {
  if (!talk || isEmptyObject(talk) || !talk.watchedAt || talk.rate === undefined) return false;
  return true;
};

const valiDate = (date) => {
  const dateRegex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  if (!dateRegex.test(date)) return false;
  return true;
};

const authDeleteMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!checkTalk(talk)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!valiDate(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

const getToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  authPassword,
  authEmail,
  talkerDataMiddleware,
  authDeleteMiddleware,
  getToken,
};