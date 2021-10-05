const fs = require('fs').promises;
const crypto = require('crypto');

const talker = 'talker.json';

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const allSpeaker = async (_req, res) => {
  const readTalker = JSON.parse(await fs.readFile(talker, 'utf-8'));

  if (readTalker.length < 1) return res.status(200).json([]);

  res.status(200).json(readTalker);
};

const findSpeaker = async (req, res) => {
  const readTalker = JSON.parse(await fs.readFile(talker, 'utf-8'));
  const findedTalker = readTalker.find((t) => t.id === Number(req.params.id));

  if (!findedTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findedTalker);
};

const verifyEmail = (email) => email.includes('@') && email.includes('.com');

const verifyPassword = (password) => password.length >= 6;

const verifyLogin = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  const verPassword = verifyPassword(req.body.password);
  const verEmail = verifyEmail(req.body.email);
  if (!verEmail) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!verPassword) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).json({ token: generateToken() });
};

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (req.headers.authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const verifyName = (req, res, next) => {
  if (!req.body.name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (req.body.name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const verifyAge = (req, res, next) => {
  if (!req.body.age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(req.body.age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const verifyTalkHate = (req, res, next) => {
  if (req.body.talk.rate > 5 || req.body.talk.rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const verifyTalk = (req, res, next) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!req.body.talk || !req.body.talk.rate || !req.body.talk.watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!regex.test(req.body.talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const addTalker = async (req, res) => {
  const { name, age, talk } = req.body;

  const array = JSON.parse(await fs.readFile(talker, 'utf-8'));

  array.push({ id: array.length + 1, name, age, talk });
  fs.writeFile(talker, JSON.stringify(array));
  res.status(201).json({ id: array.length, name, age, talk });
};

module.exports = {
  allSpeaker,
  findSpeaker,
  verifyLogin,
  addTalker,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalkHate,
  verifyTalk,
};
