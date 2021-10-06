  // requisito 3
  const isValidEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
      } if (!email.includes('@') || !email.includes('.com')) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
      }
      next(); 
  };
  
  // requisito 3
  const isValidPassword = (req, res, next) => {
    const { password } = req.body;
  
    if (!password) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
  };

  // requisito 4
  const isValidtoken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === '' || token === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' }); 
    }
    if (token.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' }); 
    }
    next();
  }; 
  // requisito 4
  const isValidName = (req, res, next) => {
    const { name } = req.body;
    if (!name || name === '') {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  };

  // requisito 4
  const isValidAge = (req, res, next) => {
    const { age } = req.body;
    if (!age || age === '') {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age.length <= 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }

    next();
  };
  
  const isvalidateFields = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk.watchedAt || talk.watchedAt === '') {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  
    if (!talk.rate || talk.rate === '') {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  
    next();
  };

  const isvalidateRate = (req, res, next) => {
    const { talk } = req.body;
  
    if (talk.rate < 1) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  
    next();
  };

  // requisito 4
  const isvalidateTalkObject = (req, res, next) => {
    const { talk } = req.body;
    const expDateValidate = /^\d{2}\/\d{2}\/\d{4}$/;
  
    if (!expDateValidate.test(talk.watchedAt)) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  
    if (talk.rate < 0 || talk.rate > 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  
    next();
  };

  // requisito 4
  const isvalidateTalk = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk) {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  
    next();
  };
  
  module.exports = {
    isValidtoken,
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidAge,
    isvalidateFields,
    isvalidateRate,
    isvalidateTalkObject,
    isvalidateTalk,
  };
