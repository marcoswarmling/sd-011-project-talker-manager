const fs = require('fs');

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

// Validate Token
// status(401) = Unauthorized Request
function valToken(req, res, next) {
  const { authorization: token } = req.headers;

  if (!token) {
    res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
}

// Validate Name
function valName(req, res, next) {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

// Validate Age
function valAge(req, res, next) {
  const { age } = req.body;
  const aux = parseInt(age, 10);

  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (aux < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

// Validate Watched & Rated
function valDate(dateString) {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
  return true;
}

function valWatchedRated(req, res, next) {
  const { watchedAt, rate } = req.body.talk;
  
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!valDate(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

// Validate Talker
function valTalker(req, res, next) {
  const { talk } = req.body;

  if (talk === undefined || talk.rate === undefined || !talk.watchedAt) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
}

module.exports = {
  loadSpeakers,
  valToken,
  valName,
  valTalker,
  valAge,
  valWatchedRated,
};
