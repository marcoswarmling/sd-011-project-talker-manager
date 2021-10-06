function checkTalker(req, res, next) {
  const { name, age } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.split('').length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (parseInt(age, 10) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  
  next();
}

module.exports = { checkTalker };
