const crypto = require('crypto');

const PASSWORD = 6;

const generateToken = () => crypto.randomBytes(8).toString('hex');
const login = (req, res) => {
  const { email, password } = req.body;
  const checkEmail = /\S+@\S+\.\S+/i.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < PASSWORD) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token: generateToken() });
};
  
const isValidToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
  
    if (!/^[a-zA-Z0-9]{16}$/.test(token)) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  };

  const validName = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  
    next();
  };
  
  const validAge = (req, res, next) => {
    const { age } = req.body;
  
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
  };
  
  const validTalk = (req, res, next) => {
    const { talk } = req.body;
     if (!talk || !talk.watchedAt || !talk.rate) {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  
    next();
  };
  
  const validaData = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const checkData = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!checkData.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  };
  
  const validRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    const rateEntreUmeCinco = /^[1-5]*$/;
  
    if (!rateEntreUmeCinco.test(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  };
  
  module.exports = {
    login,
    validName,
    validAge,
    validTalk,
    validaData,
    validRate,
    generateToken,
    isValidToken,
  };
