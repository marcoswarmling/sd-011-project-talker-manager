// Validate Age
function valAge(req, res, next) {
  const { age } = req.body;
  const aux = parseInt(age, 10);

  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (aux < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

module.exports = {
  valAge,
};
