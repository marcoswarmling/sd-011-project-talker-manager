const fs = require('file-system');

const loadSpeakers = (req, res, next) => {
  let speakers = [];
  try {
    const data = fs.readFileSync('talker.json', 'utf8');
    speakers = JSON.parse(data);
  } catch (err) {
    res.status(200).json([]);
  }
  req.speakers = speakers;
  next();
};

const createToken = (req, res, next) => {
  req.newToken = (Math.random().toString(36).substr(2, 8)) * 2;
  next();
};

// status(400) Bad Request

function valEmail(req, res, next) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email é obrigatório' });
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

function valPassword(req, res, next) {
  const { password } = req.body;
  if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = {
  loadSpeakers,
  createToken,
  valEmail,
  valPassword,
};
