function validateEmail(req, res, next) {
  const { email } = req.body;
  const emailFormat = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } 
  if (!emailFormat.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

function validateToken(req, res, next) {
  const { token } = req.headers;
  const tokenFormat = /[A-Za-z0-9]{16}/;
  
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  
  if (!tokenFormat.test(token)) return res.status(401).json({ message: 'Token inválido' });

  next();
}

function validateName(req, res, next) {
  const { name } = req.body;
  const nameFormat = /[A-z]{3,}/;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (!nameFormat.test(name)) {
    res.status(400).json({ message: 'O "nome" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk || talk === '' || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
}

function validateTalkKeys(req, res, next) {
  const { talk: watchedAt, rate } = req.body;

  const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
  const rateFormat = /[1-5]/;

  if (!dateFormat.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(rate) || !rateFormat.test(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 a 5' });
  }
  next();
}

module.exports = { 
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
};