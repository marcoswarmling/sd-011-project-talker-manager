const fs = require('fs').promises;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!regex.test(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if ((talk.rate < 1 || talk.rate > 5)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const createTalks = async (req, res) => {
  const { name, age, talk } = req.body;
  const data = JSON.parse(await fs.readFile('./talker.json'));
  data.push({
    id: data.length + 1,
    name,
    age,
    talk,
  });
  await fs.writeFile('./talker.json', JSON.stringify(data));
  return res.status(201).json({ 
    id: data.length,
    name,
    age,
    talk,
  });
};

module.exports = {
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
createTalks };
