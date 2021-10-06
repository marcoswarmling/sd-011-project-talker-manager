const fs = require('fs').promises;
const crypto = require('crypto');

const talkerPath = './talker.json';

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const getToken = (req, res) => {
  res.status(200).json({ token: generateToken() });
};

const getArrayTalkers = async (req, res) => {
  try {
    const palestrantes = await fs.readFile(talkerPath, 'utf-8');
    if (!palestrantes) return res.status(200).json([]);
  res.status(200).json(JSON.parse(palestrantes));
  } catch (err) {
    res.status(400).json(err);
  }
};

const message = { message: 'Pessoa palestrante não encontrada' };

const getTalkerId = async (req, res) => {
    const palestrantes = await fs.readFile(talkerPath, 'utf-8');
    const { id } = req.params;
    const talker = JSON.parse(palestrantes).find((r) => r.id === Number(id));
    if (!talker) return res.status(404).json(message);
    return res.status(200).json(talker);
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /.+@.+\.[A-Za-z]+$/.test(email);
  if (!regexEmail || email === '') { 
    return res.status(400).json({ message: 'O campo email é obrigatório' });
  }
  return next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const validPassword = password.length > 6;
  if (!validPassword) {
    return res.status(400).json({ message: 'O campo email é obrigatório' });
  }
  return next();
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ 
      message: 'Token não encontrado',
    });
  }

  if (token.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    }); 
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const validAge = age >= 18;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!validAge) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const resObj = async (req, res) => {
  const { name, age, talk } = req.body;
const palestrantes = JSON.parse(await fs.readFile(talkerPath, 'utf-8'));
const asasa = {
  id: palestrantes.length + 1,
  name,
  age,
  talk: {
    watchedAt: talk.watchedAt,
    rate: talk.rate,
  },
  };
  palestrantes.push(asasa);
  await fs.writeFile(talkerPath, JSON.stringify(palestrantes));
  res.status(201).json(asasa);
};

const resObjID = async (req, res) => {
const { id } = req.params;
const { name, age, talk } = req.body;
const palestrantes = JSON.parse(await fs.readFile(talkerPath, 'utf-8'));
const asasa = {
  id: Number(id),
  name,
  age,
  talk: {
    watchedAt: talk.watchedAt,
    rate: talk.rate,
  },
  };
  console.log(asasa);
  palestrantes.push(asasa);
  await fs.writeFile(talkerPath, JSON.stringify(palestrantes));
  res.status(200).json(asasa);
};

const validateDate = (req, res, next) => {
  const { talk } = req.body;
  const regexDate = !/\d{2}\/\d{2}\/\d{4}$/.test(talk.watchedAt);
  if (!talk.watchedAt) {
    return res.status(400).json({
       message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
     }); 
   }
  if (regexDate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const validRate = Number(talk.rate) < 1 || Number(talk.rate) > 5;
  if (validRate) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!talk.rate) {
    return res.status(400).json({
       message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
     }); 
   }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
 return res.status(400).json({
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  }); 
}
  next();
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const palestrantes = JSON.parse(await fs.readFile(talkerPath, 'utf-8'));
  const deleteFilter = palestrantes.filter((v) => v.id !== Number(id));
  await fs.writeFile(talkerPath, JSON.stringify(deleteFilter));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = { 
  getArrayTalkers,
  getTalkerId, 
  validateEmail, 
  validatePassword, 
  getToken, 
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateTalk,
  resObj,
  resObjID,
  deleteTalker,
};
