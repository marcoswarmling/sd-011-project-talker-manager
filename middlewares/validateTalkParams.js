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

// regex source: https://stackoverflow.com/questions/3750814/can-someone-give-me-a-regular-expression-for-a-number-to-be-between-1-and-5
function checkRate(rate) {
  // const rateRegex = /^[1-5]$/;
  // return rate.match(rateRegex);
  if (rate < 0 || rate > 5) {
    return false;
  }
  return true;
}

const validateTalk = (req, res, next) => {
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
  
module.exports = validateTalk;