  const isValidToken = (req, res, next) => {
    const token = req.headers.authorization;
    const validToken = () => (token.length === 16);

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    
    if (!validToken() || token === '') {
      return res.status(401).json({ message: 'Token inválido' });
    }

    next();
  };

  const isValidName = (req, res, next) => {
    const { name } = req.body;
    const limit = 3;
  
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    
    if (name.length < limit) {
      return res.status(401).json({ message: 'O "name" ter pelo menos 3 caracteres' });
    }
  
    next();
  };

  const isValidAge = (req, res, next) => {
    const { age } = req.body;
    const limit = 18;
  
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    
    if (age.length < limit) {
      return res.status(401).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
  
    next();
  };

  const isValidTalk = (req, res, next) => {
    const { talk } = req.body;
    const keysTalk = Object.keys(talk);

    if (!talk || keysTalk.length !== 2) {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      },
      );
    }

    next();
  };

  const isValidDate = (req, res, next) => {
    const { watchedAt } = req.body.talk;
    // Link: https://www.codegrepper.com/code-examples/javascript/javascript+validate+date+dd%2Fmm%2Fyyyy
    const dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  
    if (!(dateFormat.test(watchedAt))) {
      return res.status(400).json(
        { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
      );
    }
  
    next();
  };

  const isValidRate = (req, res, next) => {
    const { rate } = req.body.talk;
    const rateLimit = /^[1-5]$/;

    if (rateLimit.test(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

    next();
  };
  
  module.exports = { isValidToken, isValidName, isValidAge, isValidDate, isValidTalk, isValidRate };