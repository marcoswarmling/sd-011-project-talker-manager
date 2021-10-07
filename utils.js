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
  req.newToken = Math.random().toString(36).substr(2, 8)
    + Math.random().toString(36).substr(2, 8);
  next();
};

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.includes('@') || !email.includes('.com')) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

function validateToken(req, res, next) {
  const { authorization: token } = req.headers;
  if (!token) res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age) res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (parseInt(age, 10) < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function isValidDate(dateString) {
  // https://qastack.com.br/programming/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
  return true;
}

function validateWatchedAndRate(req, res, next) {
  const { watchedAt, rate } = req.body.talk;
  if (rate < 1 || rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!isValidDate(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (talk === undefined) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

module.exports = {
  loadSpeakers,
  createToken,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateTalk,
  validateAge,
  validateWatchedAndRate,
};
