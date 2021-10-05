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

module.exports = {
  allSpeaker,
  findSpeaker,
  verifyLogin,
};
