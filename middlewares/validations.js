const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};
const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (password.length < 6) {
      res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};
const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    const validTokenSize = 16;
    if (!token) res.status(401).json({ message: 'Token não encontrado' });

    if (token.length < validTokenSize) {
      res.status(401).json({ message: 'Token inválido' });
  }
    next();
};
const validateName = (req, res, next) => {
    const { name } = req.body;
    const validNameSize = 3;
    if (!name) res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < validNameSize) {
      res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};
const validateAge = (req, res, next) => {
    const { age } = req.body;
    const validAge = 18;
    if (!age) {
      res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age <= validAge) {
      res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};
const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
      res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  if (!talk.watchedAt || (!talk.rate && Number(talk.rate) !== 0)) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
    next();
};
const validateTalkItems = (req, res, next) => {
  const dateRegex = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;
  const talkRateRegex = /^[1-5]$/;
  const { talk } = req.body;
  if (!dateRegex.test(talk.watchedAt)) {
    res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
if (!talkRateRegex.test(talk.rate)) {
    res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}
next();
};
module.exports = { validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkItems,
};