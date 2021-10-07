/* Regex retirado do curso de React.js da Origamid.
https://www.origamid.com/curso/react-completo/ */

const validEmail = (req, res, next) => {
  const { email } = req.body;

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
  const testedEmail = emailRegex.test(String(email).toLowerCase());

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!testedEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}; 

module.exports = validEmail;
