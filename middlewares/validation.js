// -----------------------Requisito 3: login ------------------------------------
// Determina qual o formato do email válido (no body)
const emailValido = (req, res, next) => {
 const REGEX_EMAIL = /^[^\s@]+@[^\s@]+$/i;
 
 // "Recebe" o email pela requisição:
 const { mail } = req.body;

// valida as condições do email inserido (se não for de acordo com o padrão ou não for informado, retorne erro)
if (!mail || mail === '') {
    return res.status(404).json({ message: 'O campo "email" é obrigatório' });
}
// retorna o padrão correto do email para que o usuário corrija: 
if (!mail.match(REGEX_EMAIL)) {
    return res.status(404).json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
next();
};

const senhaValida = (req, res, next) => {
    const { senha } = req.body;
// retorna erro caso a senha não seja digitada:
if (!senha) {
    return res.status(404).json({ message: 'message": "O campo "password" é obrigatório' });
}

// retorna erro caso a senha tenha menos de 6 caracteres:
if (senha.length < 6) {
    return res.status(404).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}
next();
};

// exporta as funções que serão utilizadas no router e no index:
module.exports = {
    emailValido,
    senhaValida,
};