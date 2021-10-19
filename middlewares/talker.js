// const validateToken = async (req, res, next) => {
//  const { authorization } = req.headers;
//   if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
//   if (authorization.length < 16 || authorization.length > 16) {
//     return res.status(401).json({ messsage: 'Token inválido' });
//   }
//   next();
// };

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateTalkBody = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
     return res.status(400)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};
const validateTalkKeys = (req, res, next) => {
  // referencia do validacao regexData tirada de regexr.com
  const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const { talk } = req.body;
  const { watchedAt } = talk;
  if (!regexData.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
}
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
   return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalkBody,
  validateTalkKeys,
};
