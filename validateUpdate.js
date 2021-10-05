const validateToken = (token) => {
  if (!token) return { message: 'Token não encontrado' };
  if (token.length < 16) return { message: 'Token inválido' };
};

const validateName = (name) => {
  if (!name) return { message: 'O campo "name" é obrigatório' };
  if (name.length < 3) return { message: 'O "name" deve ter pelo menos 3 caracteres' };
};

const validateAge = (age) => {
  if (!age) return { message: 'O campo "age" é obrigatório' };
  if (Number(age) <= 18) return { message: 'A pessoa palestrante deve ser maior de idade' };
};

const validateDate = (date) => /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g.test(date);

const valdidateRate = (rate) => rate >= 1 && rate <= 5;

const checkFields = (talk) => !talk || talk.rate === undefined || !talk.watchedAt;

const validateTalk = (talk) => {
  if (checkFields(talk)) {
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  const { watchedAt, rate } = talk;
  if (!validateDate(watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (!valdidateRate(Number(rate))) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  } 
};

const validateUpdate = (req, res, next) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  const checkToken = validateToken(authorization);
  const checkName = validateName(name);
  const checkAge = validateAge(age);
  const checkTalk = validateTalk(talk);
  if (checkToken) return res.status(401).json(checkToken);
  if (checkName) return res.status(400).json(checkName);
  if (checkAge) return res.status(400).json(checkAge);
  if (checkTalk) return res.status(400).json(checkTalk);
  next();
};

module.exports = validateUpdate;