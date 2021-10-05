const regexDate = /^\d{2}\/\d{2}\/\d{4}$/gm;

const validToken = (token, msg) => {
  if (!token) return 'Token não encontrado';
  if (token.length !== 16) return 'Token inválido';
  return msg;
};

const validName = (name, msg) => {
  if (!name || name === '') return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  return msg;
};

const validAge = (age, msg) => {
  if (!age || age === '') return 'O campo "age" é obrigatório';
  if (age < 18) return 'A pessoa palestrante deve ser maior de idade';
  return msg;
};

const antiComplexity = (talk) => {
  if (!talk) return true;
  const { watchedAt, rate } = talk;
  return !watchedAt || !rate || watchedAt === '' || rate === '';
};

const validTalk = (talk, msg) => {
  if (antiComplexity(talk)) {
    return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  }
  const { watchedAt, rate } = talk;
  if (rate < 1 || rate > 5) return 'O campo "rate" deve ser um inteiro de 1 à 5';
  if (!regexDate.test(watchedAt)) return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  return msg;
};

const authCreateTalker = (req, res, next) => {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  const err = { message: '' };
  err.message = validToken(authorization, err.message);
  if (err.message !== '') return res.status(401).json(err);
  err.message = validName(name, err.message);
  if (err.message === '') err.message = validAge(age, err.message);
  if (err.message === '') err.message = validTalk(talk, err.message);
  if (err.message !== '') return res.status(400).json(err);

  next();
};

module.exports = authCreateTalker;
