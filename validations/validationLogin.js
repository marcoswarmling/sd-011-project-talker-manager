const crypto = require('crypto');
const fs = require('fs').promises;

const writeTalker = (newFile) => fs.writeFile('./talker.json', JSON.stringify(newFile));

const emailOk = (req, res, next) => {
  const { email } = req.body;
  const valid = /\S+@\S+\.\S+/; // -> https://www.horadecodar.com.br

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }  
  if (!valid.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordOk = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = {
    email,
    password,
  };
  const db = await fs.readFile('./talker.json', 'utf8')
  .then((data) => JSON.parse(data));
  db.push(user);
  await writeTalker(db);
  res.status(201).json(user);
  next();
};

const generateToken = (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
};

module.exports = { emailOk, passwordOk, generateToken, login };