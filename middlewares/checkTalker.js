function checkTalker(request, response, next) {
  const { name, age } = request.body;
  if (!name) return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.split('').length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (parseInt(age, 10) < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function checkTalk(request, response, next) {
  const { talk } = request.body;
  if (!talk) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  const { talk: { watchedAt, rate } } = request.body;  
  if (!watchedAt || !rate) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
}

function checkDate(request, response, next) {
  const { talk: { watchedAt } } = request.body;
  if (watchedAt.split('/').length !== 3) {
    return response.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (watchedAt.split('/')[0].length !== 2) {
    return response.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (watchedAt.split('/')[1].length !== 2) {
    return response.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (watchedAt.split('/')[2].length !== 4) {
    return response.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function checkRate(request, response, next) {
  const { talk: { rate } } = request.body;

  if (!Number.isInteger(parseInt(rate, 10))) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (rate < 1 || rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

module.exports = { checkTalker, checkTalk, checkDate, checkRate };
