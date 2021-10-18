const crypto = require('crypto');

function mkToken() { return crypto.randomBytes(8).toString('hex'); }

const emailChk = (_require, response, next) => {
    const { email } = _require.body;
    
    if (!email) {
        return response.status(400)
                       .json({ message: 'O campo "email" é obrigatorio' });
    }

    const emailRgx = /\S+@\S+\.\S+/;

    if (emailRgx.test(email)) {
        return response.status(400)
                       .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
};

const passChk = (_require, response, next) => {
    const { password } = _require.body;
    
    if (!password) {
        return response.status(400)
                       .json({ message: 'O campo "password" é obrigatorio' });
    }

    const passwordRgx = /(.){6,}/;

    if (passwordRgx.test(password)) {
        return response.status(400)
                       .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    next();
};

module.exports = { emailChk, passChk, mkToken };
