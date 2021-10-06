const crypto = require('crypto');
const { getTalkers } = require('./readTalker');

const IDVerification = (req, res, next) => {
  const { id } = req.params;
  const talkers = getTalkers();
  const talkersIds = talkers.map((talker) => Number(talker.id));
  const talkerIncluded = talkersIds.includes(Number(id));
  if (!talkerIncluded) { 
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

const EmailVerification = (req, res, next) => {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const { email } = req.body;
  if (!email || email === '') {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.match(regexEmail)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const PasswordVerification = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const TokenCreation = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ token });
  }
  next();
};

const TokenVerification = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) res.status(401).json({ message: 'Token inválido' });
  next();
};

const nameAndAgeVerification = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const watchedAtVerification = (req, res, next) => {
  const { talk } = req.body;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!talk || !talk.watchedAt) {
    res.status(400).json({
       message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!dateRegex.test(talk.watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const ratedVerification = (req, res, next) => {
  const { talk } = req.body;
  if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
    res.status(400).json({ 
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (!talk.rate) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

module.exports = { 
  TokenCreation,
  IDVerification,
  EmailVerification,
  TokenVerification,
  ratedVerification,
  PasswordVerification,
  watchedAtVerification,
  nameAndAgeVerification,
};