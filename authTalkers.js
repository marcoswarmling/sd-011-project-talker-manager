const crypto = require('crypto');
const { getTalkers } = require('./readTalker');

const userToken = crypto.randomBytes(8).toString('hex');

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
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!(email.includes('.com') && email.includes('@'))) {
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

const TokenCreation = (_req, res) => {
  res.status(200).json({ token: userToken });
};

const TokenVerification = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization && authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameVerify = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name && name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const AgeVerify = (req, res, next) => {
  const { age } = req.body;
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
  AgeVerify,
  nameVerify,
  TokenCreation,
  IDVerification,
  EmailVerification,
  TokenVerification,
  ratedVerification,
  PasswordVerification,
  watchedAtVerification,
};