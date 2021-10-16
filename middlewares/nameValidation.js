// Valida o nome:
const nameValidation = (req, res, next) => {
    const { name } = req.body;
    
// retorna erro caso o nome não seja digitado:
if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
}

// retorna erro caso o nome tenha menos de 3 caracteres:
if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
}
next();
};

module.exports = nameValidation;