/*
  REGEX VALIDATION REFERENCES
  https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
*/

const validateEmail = (req, res, next) => {
    const { email } = req.body;
  
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  
    const emailRegex = /[a-z0-9._-]+@[a-z0-9]+\.[a-z]+$/i;
    const checkEmailValidation = emailRegex.test(email.toLowerCase());
  
    if (!checkEmailValidation) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
  
    next();
  };
  
  const validatePassword = (req, res, next) => {
    const { password } = req.body;
  
    if (!password) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
  
    next();
  };
  
  module.exports = { validateEmail, validatePassword };