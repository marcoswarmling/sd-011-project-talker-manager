const fs = require('file-system');

// load Speakers
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

// create Token
const createToken = (req, res, next) => {
  req.newToken = (Math.random().toString(36).substr(2, 8)) * 2;
  next();
};

// Validate Email
// status(400) Bad Request
function valEmail(req, res, next) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email é obrigatório' });
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

// Validate Password
function valPassword(req, res, next) {
  const { password } = req.body;
  if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

// Validate Token
// status(401) = Unauthorized Request
function valToken(req, res, next) {
  const { authorization: token } = req.headers;
  if (!token) res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
}

module.exports = {
  loadSpeakers,
  createToken,
  valEmail,
  valPassword,
  valToken,
};
