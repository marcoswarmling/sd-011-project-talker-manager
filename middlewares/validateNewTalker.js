const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  
    if (token.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  
    next();
  };
  
  const validateTalkerName = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
  
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  
    next();
  };
  
  const validateTalkerAge = (req, res, next) => {
    const { age } = req.body;
  
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
  
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
  
    next();
  };
  
  const validateTalkeBodyInfos = (req, res, next) => {
    const { talk: { watchedAt, rate } } = req.body;
  
    const dataRegex = /(\d{2})[/](\d{2})[/](\d{4})/;
    const rateRegex = /^[1-5]{0,1}$/;
  
    if (!dataRegex.test(watchedAt)) {
      return res.status(400).json({
           message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  
    if (!rateRegex.test(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  
    next();
  };
  
  const validateTalkBody = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk) {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  
    const { watchedAt, rate } = talk;
  
    if (!watchedAt || !rate === undefined) {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  
    next();
  };

  module.exports = {
    validateToken,
    validateTalkerName,
    validateTalkerAge,
    validateTalkBody,
    validateTalkeBodyInfos,
  };
