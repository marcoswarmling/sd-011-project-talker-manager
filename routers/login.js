const express = require('express');

const router = express.Router();

// gerador de token com base na resposta do usuario ThisClark no site https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
function generateToken() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 16; i += 1) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

function validateEmail(email) {
    const re = /[\w\d.+_-]+@[\w]+.com/;
    return re.test(String(email).toLowerCase());
}

function validate(email, password) {
    if (!email) {
           return { message: 'O campo "email" é obrigatório' };
    } if (!validateEmail(email)) {
       return { message: 'O "email" deve ter o formato "email@email.com"' };
    } if (!password) {     
         return { message: 'O campo "password" é obrigatório' };
    } if (password.length < 5) {
        return { message: 'O "password" deve ter pelo menos 6 caracteres' };
    }
}

router.post('/', (req, res) => {
const {email, password} = req.body;
const returnedError = validate(email, password);
const token = generateToken()
if (!returnedError) {
    return res.status(200).json({ token});
}
    return res.status(400).json(returnedError);
});

module.exports = router;