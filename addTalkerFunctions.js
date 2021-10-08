const fs = require('fs').promises;

function setTalkers(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}
function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) res.status(401).json({ message: 'Token inválido' });
  next();
}

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '' || name === undefined) { 
    res.status(400).json({ message: 'O campo "name" é obrigatório' }); 
}
  if (name.length < 3) {
 res.status(400).json({ 
    message: 'O "name" deve ter pelo menos 3 caracteres', 
  }); 
}
  next();
}
function validateAge(req, res, next) {
  const { age } = req.body;
  if (age === undefined || age === '') { 
    res.status(400).json({ message: 'O campo "age" é obrigatório' }); 
}
  if (age < 18) {
    res.status(400).json({ 
      message: 'A pessoa palestrante deve ser maior de idade', 
    }); 
  }
  next();
}

function notEmptyFunc(watchedAt, rate) {
  return watchedAt !== '' && rate !== '' && watchedAt && rate !== undefined;
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  } 
  const notEmpty = notEmptyFunc(talk.watchedAt, talk.rate);
  if (!notEmpty) {
    res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    }); 
  }
  next();
}
function validateTalk2(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  // rege pego do site :https://www.regextester.com/99555
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const newRate = Number(rate);
  if (newRate > 5 || newRate < 1) {
 res.status(400).json({
    message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
}
  // Dica de Cesar Bhering e Leandro Lopes, uso do regex.test: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  if (!regex.test(watchedAt)) {
 res.status(400).json({
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}
  next();
}

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalk2,
  setTalkers,
};