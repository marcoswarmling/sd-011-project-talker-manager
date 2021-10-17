const emaill = (req, res, next) => {
    const { email } = req.body;
    if (!email || email === '') {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.includes('@') || !email.includes('.com')) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const passwordd = (req, res) => {
    const { password } = req.body;
  
    if (!password) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    } 
  
    if (passwordd.length < 6) {
      return res.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }    
};

module.exports = {
    emaill,
    passwordd,
}