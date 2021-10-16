// Valida o token:
const tokenValidation = (req, res, next) => {
    const token = req.headers.authorization;

// retorna erro caso o token não seja digitado:
if (!token || token === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
}
// retorna erro caso o token tenha menos de 16 caracteres:
if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
}
next();
};

module.exports = tokenValidation;