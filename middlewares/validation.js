// -----------------------Requisito 3: login validações ------------------------------------
// Determina qual o formato do email válido (no body)
const emailValido = (req, res, next) => {
 const REGEX_VALID_EMAIL = /^[^\s@]+@[^\s@]+$/i;
 
 // "Recebe" o email pela requisição:
 const { email } = req.body;

// valida as condições do email inserido (se não for de acordo com o padrão ou não for informado, retorne erro)
if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
}
// retorna o padrão correto do email para que o usuário corrija: 
if (!email.match(REGEX_VALID_EMAIL)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
next();
};

const senhaValida = (req, res, next) => {
    const { password } = req.body;
// retorna erro caso a senha não seja digitada:
if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}
// retorna erro caso a senha tenha menos de 6 caracteres:
if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}
next();
};

// exporta as funções que serão utilizadas no router e no index:
module.exports = {
    emailValido,
    senhaValida,
};