const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') { 
    return res.status(200).json({ message: 'O campo "email" é obrigatório' }); 
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(200).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
};

module.exports = isValidEmail;