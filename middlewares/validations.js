const moment = require('moment');

const isValidtoken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === '' || token === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' }); 
}
    if (token.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' }); 
}
      next();
  }; 

  const isValidEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
      } if (!email.includes('@') || !email.includes('.com')) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
      }
      next(); 
  };
  
  const isValidPassword = (req, res, next) => {
    const { password } = req.body;
  
    if (!password) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
  };

  const isValidName = (req, res, _next) => {
    const { name } = req.body;
    if (!name || name === '') {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  };

  const isValidAge = (req, res, _next) => {
    const { age } = req.body;
    if (!age || age === '') {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age.length <= 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
  };

  const isValidTalk = (req, res, _next) => {
    const { talk: { watchedAt, rate } } = req.body;
    const date = moment(watchedAt, 'DD/MM/YYYY', true).isValid(); 
    if (!watchedAt || watchedAt !== date) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (Number.isInteger(rate) >= 1 && Number.isInteger(rate) <= 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  };

  const isValidParamTalk = (req, res, _next) => {
    const { talk: { watchedAt, rate } } = req.body;
    if (!watchedAt && !rate) {
      return res.status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
  };
  
  module.exports = {
    isValidtoken,
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidAge,
    isValidTalk,
    isValidParamTalk,
  };
