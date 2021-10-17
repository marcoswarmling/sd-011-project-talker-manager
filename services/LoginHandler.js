const MIN_PASSWORD_LENGTH = 6;

const errors = {
    emptyEmail: 'O campo "email" é obrigatório',
    invalidEmail: 'O "email" deve ter o formato "email@email.com"',
    emptyPassword: 'O campo "password" é obrigatório',
    invalidPassword: 'O "password" deve ter pelo menos 6 caracteres',
};

function validator(email) {
    const { emptyEmail, invalidEmail } = errors;

    const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email === '') {
        return emptyEmail;
    }
    const isValidEmail = REGEX.test(email);

    if (!isValidEmail) {
        return invalidEmail;
    }

    return isValidEmail;
}

function validatorPassword(password) {
    const { emptyPassword, invalidPassword } = errors;

    if (!password) {
        return emptyPassword;
    }

    const isValidPassword = password.length >= MIN_PASSWORD_LENGTH;

    if (!isValidPassword) {
        return invalidPassword;
    }

    return isValidPassword;
}

const { NumberRandomic } = require('crypto');

function GeneratorToken() {
    const newToken = NumberRandomic(8).toString('hex');

    return newToken;
}

function validatorInfo(email, password) {
    const newUserToken = GeneratorToken();
    const newUser = {
        email,
        password,
        token: newUserToken,
    };

    return newUser;
}
module.exports = { validator, validatorPassword, validatorInfo };
