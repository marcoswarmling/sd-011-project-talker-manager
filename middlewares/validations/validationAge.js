export default function validationAge(req, res, next) {
    const { age } = req.headers;
    if (!age) { return res.status(400).json({ message: 'O campo "age" é obrigatório' }); }
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
}
