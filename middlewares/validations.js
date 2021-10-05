const fs = require('fs').promises;
const crypto = require('crypto');

const jsonFile = './talker.json';

const getTalkers = async (req, res) => {
  try {
    const response = await fs.readFile(jsonFile, 'utf-8');
    if (!response) {
      return res.status(200).json([]);
    }
    res.status(200).json(JSON.parse(response));
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTalkerById = async (req, res) => {
  try {
    const response = await fs.readFile(jsonFile, 'utf-8');
    const responseConvert = JSON.parse(response);
    const talker = responseConvert.find(({ id }) => id === parseInt(req.params.id, 10));
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talker);
  } catch (err) {
    res.status(400).json(err);
  }  
};

const getToken = (req, res) => {
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}
    
  if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = { 
getTalkers, 
getTalkerById, 
getToken, 
emailValidation, 
passwordValidation };