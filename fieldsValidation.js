// Requisito 3 - Verifica se o campo "e-mail" foi preenchido e se contem o caracter "@" e o componente ".com".
const emailValidation = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.includes('@') || !email.includes('.com')) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

// Requisito 3 - Verifica se o campo "password" foi preenchido e se possui pelo menos 6 caracteres
const passwordValidation = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

// Requisito 3 - Gera um código de status 200 com um Token aleatório de 16 caracteres
// Esta função foi desenvolvida com base na solução apresentada pelo usuário "ThisClark" (https://stackoverflow.com/users/1161948/thisclark) no seguinte post: "https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/"
const generateToken = (req, res) => {
    let token = '';
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 16; i += 1) {
        token += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
    return res.status(200).json({ token });
};

module.exports = { emailValidation, passwordValidation, generateToken };