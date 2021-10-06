function validateEmail(req, res, next) {  
  const { email } = req.body;  
  const re = /\S+@\S+\.\S+/;
  const emailTest = re.test(email);
  
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  if (emailTest === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

function validateName(req, res, next) {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status();
  }
}

module.exports = { validateEmail, validatePassword };