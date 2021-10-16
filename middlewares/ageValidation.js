// Valida a idade:
const ageValidation = (req, res, next) => {
    const { age } = req.body;
    
// retorna erro caso a idade não seja digitada:
if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
}

// retorna erro caso a idade seja inferior a 18:
if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
}
next();
};

module.exports = ageValidation;