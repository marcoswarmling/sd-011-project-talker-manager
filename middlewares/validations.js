// Some functions in this js file were inspired by the solutions available on Trybe's Course.

const emailVal = (req, res, next) => { 
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!(email.includes('@')) || !(email.includes('.com'))
  ) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });

  next();
};
  
const passwordVal = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6
  ) return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });

  next();
};

const nameVal = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3
  ) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  next();
};

const ageVal = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18
  ) return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  
  next();
};

const talkVal1 = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !(talk.watchedAt) || (!(talk.rate) && talk.rate !== 0)) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const dateRgx = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
// regex date pattern from RegexTester
// https://www.regextester.com/99555

const talkVal2 = (req, res, next) => {
  const { talk } = req.body;
  if (!(dateRgx.test(talk.watchedAt))
  ) return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });

  if (Number(talk.rate) < 1 || Number(talk.rate) > 5
  ) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  next();
};

module.exports = { emailVal, passwordVal, nameVal, ageVal, talkVal1, talkVal2 };
