const fs = require('fs').promises;

const readFile = async (_req, res) => {
  try {
    const response = await fs.readFile('./talker.json', 'utf-8');

    return JSON.parse(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTalkers = async (_req, res) => {
  try {
    const response = await readFile();
    if (!response) {
      return res.status(200).json([]);
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTalkerId = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await readFile();
    const talker = response.find((result) => result.id === Number(id));
    
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(talker);
  } catch (err) {
    res.status(400).json(err);
  } 
};

const setValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const setValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const createToken = (_req, res) => {
  const newToken = '1234567abdertygh';
  
  return res.status(200).json({ token: `${newToken}` });
};

const generateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = {
  getTalkers,
  getTalkerId,
  setValidPassword,
  setValidEmail,
  createToken,
  generateToken,
};
