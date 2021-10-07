const existsEmailPassword = (req, res, next) => {
  const { email, password } = req.body;
  
  if ([email, password].includes(undefined)) {
    const verification = !email ? 'email' : 'password';
    return res.status(400).json({ message: `O campo "${verification}" é obrigatório` });
  }
  
  next();
};

module.exports = existsEmailPassword;
