// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
const tokenGenerator = () => {
  const length = 16;
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
};

const emailExists = (request, response, next) => {
  const { email } = request.body;
  if (!email) {
    return response.status(400).json({
      message: 'O campo "email" é obrigatório',
    }); 
  }
  next();
};

const validateEmail = (request, response, next) => {
  const recevedEmail = new RegExp('\\S+@\\S+\\.\\S+');
  const { email } = request.body;
  const validate = recevedEmail.test(email);
  if (!validate || validate === '') {
    return response.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    }); 
  }
  next();
};

const passwordExists = (request, response, next) => {
  const { password } = request.body;
  if (!password) {
    return response.status(400).json({
      message: 'O campo "password" é obrigatório',
    }); 
  }
  next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;
  if (password.length < 6) {
    return response.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    }); 
  }
  next();
};

const tokenExists = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({
      message: 'Token não encontrado',
    }); 
  }
  next();
};

const validateToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (authorization.length !== 16) {
    return response.status(401).json({
      message: 'Token inválido',
    }); 
  }
  next();
};

const nameExists = (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(400).json({
      message: 'O campo "name" é obrigatório',
    }); 
  }
  next();
};

const validateName = (request, response, next) => {
  const { name } = request.body;
  if (name.length < 3) {
    return response.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const ageExists = (request, response, next) => {
  const { age } = request.body;
  if (!age) {
    return response.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return response.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const talkExists = (request, response, next) => {
  const { talk } = request.body;
  if (!talk) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validateWatchedAt = (request, response, next) => {
  const { watchedAt } = request.body.talk;
  const datePattern = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
  if (!watchedAt) {
    return response.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',      
    });
  } if (datePattern.test(watchedAt) === false) {
    return response.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  } 
  next();
};

const rateExists = (request, response, next) => {
  const { rate } = request.body.talk;
  if (rate === 0 || rate < 1 || rate > 5) {
    return response.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  } if (!rate) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const watchedAtExists = (request, response, next) => {
  const { watchedAt } = request.body.talk;
  if (!watchedAt) {
    return response.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',      
    });
  }
  next();
};

const validateRate = (request, response, next) => {
  const { rate } = request.body.talk;
  if (rate < 1 || rate > 5) {
    return response.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  } 
  next();
};

module.exports = {
  tokenGenerator,
  emailExists,
  validateEmail,
  passwordExists,
  validatePassword,
  tokenExists,
  validateToken,
  nameExists,
  validateName,
  ageExists,
  talkExists,
  validateWatchedAt,
  rateExists,
  watchedAtExists,
  validateRate,
};