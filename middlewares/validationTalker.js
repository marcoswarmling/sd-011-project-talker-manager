function validationName(req, res, next) {
  const { name } = req.body;
  if (!name) {
     return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
   const name1 = name.trim();
  if (name1.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validationAge(req, res, next) {
  const { age } = req.body;
  const age1 = Math.floor(age);
  if (!age1 || age1 < 18) {
    const requiredAge = { message: 'O campo "age" é obrigatório' };
    const requiredover18 = { message: 'A pessoa palestrante deve ser maior de idade' };
    const validation = !age ? requiredAge : requiredover18; 
    return res.status(400).json(validation);
  }
  next();
}

function validationTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
  const { rate, watchedAt } = talk;
  if (rate === undefined || watchedAt === undefined) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
    
    next();
}
  
  function validationRate(req, res, next) {
    const { rate } = req.body.talk;
    if (rate < 1 || rate > 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (rate !== Math.floor(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    
    next();
  }

  function validationDate(req, res, next) {
     const { watchedAt } = req.body.talk;
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (regex.test(watchedAt) === false) {
      return res.status(400).json({ 
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  }

  module.exports = {
  validationName,
  validationAge,
  validationTalk,
  validationRate,
  validationDate,
};
