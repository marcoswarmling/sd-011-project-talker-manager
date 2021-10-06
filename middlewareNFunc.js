const crypto = require('crypto');

const genToken = () => crypto.randomBytes(8).toString('hex'); // double

function validateEmail(email) {
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const validEmail = regex.test(email);

  if (!email) {
    return { status: 400, message: 'O campo "email" é obrigatório' };
  }
  if (!validEmail) {
    return { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
  }
  // return { Ok: true };
}

function validatePassword(password) {
  if (!password) {
    return { status: 400, message: 'O campo "password" é obrigatório' };
  }
  if (password.length < 6) {
    return { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  // return { Ok: true };
}

// function validateToken(req, res, next) {
//   const { token } = req.body;
//   const regex = /^[\w]{16}$/i;
//   const Token = regex.test(token); // retorna true or false
//   // if (!token || regex.test(token))
//   if (!token || !token.length === 0) {
//     return { status: 401, message: 'Token não encontrado' };
//   }
//   if (!Token) {
//     return { status: 401, message: 'Token inválido' };
//   } 
//   // return { Ok: true };
//   next();
// }

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const validatedEmail = validateEmail(email);
  const validatedPassword = validatePassword(password);

  if (!validatedPassword) {
    return res.status(400).json({ message: validatedPassword.message });
  }
  if (!validatedEmail) {
    return res.status(400).json({ message: validatedEmail.message });
  }
  
  // if (validatedEmail && validatedPassword) {
  //   const token = genToken();
  //   return res.status(200).json({ token });
  // }

  next();
}
module.exports = { validateLogin, genToken };