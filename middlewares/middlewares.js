const fs = require('fs').promises;

const readTalkers = async (req, res) => {
  const data = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  if (!data) return res.status(200).json([]);
  return res.status(200).json(data);
};

const readTalkerById = async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const result = data.find((talker) => talker.id === Number(id));
  if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(result);
};

function checkEmail(email) {
  const regex = /\S+@\S+.\S+/;
  return regex.test(email);
}

const validateEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!checkEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campos "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

// https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
function generateToken() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i += 1) {
     text += possible.charAt(Math.floor(Math.random() * possible.length)); 
  }
  return text;
}

const giveToken = (req, res) => {
  const key = generateToken();
  return res.status(200).json({ token: key });
};

module.exports = { readTalkers, readTalkerById, validateEmailAndPassword, giveToken };
