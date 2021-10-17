const fs = require('fs').promises;

const writeTalker = (newFile) => fs.writeFile('./talker.json', JSON.stringify(newFile));

const tokenAuthentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16 || authorization.length > 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameOk = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageOk = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkRateOk = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

// https://qastack.com.br/programming/15491894/regex-to-validate-date-format-dd-mm-yyyy
const talkWatchedAtOk = (req, res, next) => {
  const { talk } = req.body;
  const isValidDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i; 
  if (!isValidDate.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}; 

const talkOk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const newTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const db = await fs.readFile('./talker.json', 'utf8')
  .then((data) => JSON.parse(data));
  const talker = {
    name,
    age,
    id: db.length + 1,
    talk,
  };
  db.push(talker);
  await writeTalker(db);
  res.status(201).json(talker);
};

module.exports = {
  tokenAuthentication,
  newTalker,
  nameOk,
  ageOk,
  talkWatchedAtOk,
  talkRateOk,
  talkOk };