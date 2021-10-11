function checkParams(talk) {
  const { watchedAt, rate } = talk;
  let paramsExists = true;
  
  if (!watchedAt || watchedAt === '' || !rate || rate === '') {
    paramsExists = false;
  }

  return paramsExists;
}

// regex source: https://www.py4u.net/discuss/275334
function testDateRegex(date) {
  const dateRegex = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/g;
  return date.match(dateRegex);
}

function checkRate(rate) {
  if (rate < 0 || rate > 5) {
    return false;
  }
  return true;
}

const validateTalkParams = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;

  if (!checkParams(talk)) {
    return res.status(400).json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (!testDateRegex(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!checkRate(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};
  
module.exports = validateTalkParams;