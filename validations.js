const validEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\w+@\w+.com(.br)?/;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
  }

  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }

  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }

  next();
};

const validToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token === '') return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' }); 
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }
  
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' }); 
  }

  if (age < Number(18)) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
  }
  
  next();
};

const validWatchAt = (req, res, next) => {
  const { talk } = req.body;
  const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/; // regex baseado na solução apresentada no stackoverflow(url: https://stackoverflow.com/questions/10194464/javascript-dd-mm-yyyy-date-check)
  if (!regex.test(talk.watchedAt)) {
  return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }

  next();
};

const validTalkRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }
  if (!talk.rate) {
    return res.status(400)
      .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
   }); 
   }
  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt) {
    return res
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
} 
  next();
};

module.exports = {
  validEmail,
  validPassword,
  validAge,
  validName,
  validTalk,
  validWatchAt,
  validTalkRate,
  validToken };