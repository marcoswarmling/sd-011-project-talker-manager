const crypto = require('crypto');

// rest codes:
const BAD_REQUEST = 400;

function mkToken() { return crypto.randomBytes(8).toString('hex'); }

const emailChk = (request, response, next) => {
    const { email } = request.body;
    console.log(email);
    
    if (!email) {
        return response.status(BAD_REQUEST)
                       .json({ message: 'O campo "email" é obrigatório' });
    }

    const emailRgx = /\S+@\S+\.\S+/;

    if (!emailRgx.test(email)) {
        return response.status(BAD_REQUEST)
                       .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
};

const passChk = (request, response, next) => {
    const { password } = request.body;
    
    if (!password) {
        return response.status(BAD_REQUEST)
                       .json({ message: 'O campo "password" é obrigatório' });
    }

    if (password.length < 6) {
        return response.status(BAD_REQUEST)
                       .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    next();
};

module.exports = { emailChk, passChk, mkToken };
