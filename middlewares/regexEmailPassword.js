const regexEmailPassword = (req, res, next) => {
  const { email, password } = req.body;
  const regexEmail = /\w+@\w+.com(.br)?/; 
  const minNumb = 6;
    
  if (regexEmail.test(email) === false || password.length < minNumb) {
    console.log(password.length);
    const mensageEmailError = 'O email deve ter o formato email@email.com';
    const mensagePassWordError = 'O password deve ter pelo menos 6 caracteres';
    const verification = password.length < minNumb ? mensagePassWordError : mensageEmailError;
    return res.status(400).json({ message: `${verification}` });
  }
  next();
};

module.exports = regexEmailPassword;