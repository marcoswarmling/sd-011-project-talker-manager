// rest codes:
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const validToken = (request, response, next) => {
    const token = request.headers.authorization;
    
    if (!token) { 
        return response.status(UNAUTHORIZED)
                       .json({
                        message: 'Token não encontrado',
                      });
    }
    if (token.length !== 16) {
        return response.status(UNAUTHORIZED)
                       .json({
                        message: 'Token inválido',
                      });
    }
    next();
};

const validName = (request, response, next) => {
    const { name } = request.body;
    
    if (!name) { 
        return response.status(BAD_REQUEST)
                       .json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return response.status(BAD_REQUEST)
                       .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
};

const validAge = (request, response, next) => {
    const { age } = request.body;
    
    if (!age) { 
        return response.status(BAD_REQUEST)
                       .json({ message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) < 18) {
        return response.status(BAD_REQUEST)
                       .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }

    next();
};

const validTalk = (request, response, next) => {
    const { talk } = request.body;
    const msg = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
    if (!talk || !talk.watchedAt) { 
        return response.status(BAD_REQUEST)
                       .json({ message: msg });
    }

    next();
};

const validRate = (request, response, next) => {
    const { talk } = request.body;
    const { rate } = talk;

    const msg = 'O campo "rate" deve ser um inteiro de 1 à 5';

    if (rate < 1 || rate > 5) { 
        return response.status(BAD_REQUEST)
                       .json({ message: msg });
    }

    next();
};

const validDate = (request, response, next) => {
    const { talk } = request.body;
    const { watchedAt } = talk;
    
    const watchedAtRgx = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;

    const msg = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

    if (!watchedAtRgx.test(watchedAt)) { 
        return response.status(BAD_REQUEST)
                       .json({ message: msg });
    }

    next();
};

const validRating = (request, response, next) => {
    const { talk } = request.body;
    const { watchedAt, rate } = talk;

    const msg = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

    if (!watchedAt || !rate) { 
        return response.status(BAD_REQUEST)
                       .json({ message: msg });
    }

    next();
};

module.exports = {
  validAge,
  validDate,
  validName,
  validRate,
  validRating,
  validTalk,
  validToken,
};