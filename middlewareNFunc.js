/* eslint-disable complexity */
/* eslint-disable quotes */
const crypto = require('crypto');

const genToken = () => crypto.randomBytes(8).toString('hex'); // double

// function validateEmail(email) {
//   const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
//   const validEmail = regex.test(email);
  
//   // if (!email) {
//   //   return false;
//   // }
//   if (!validEmail) {
//     return false;
//   }
//   return true;
// }

// function validatePassword(password) {
//   if (!password) {
//     return false;
//   }
//   // if (password.length < 6) {
//   //   return false;
//   // }
//   return true;
// }

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
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const validEmail = regex.test(email); // return true or false and async

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

module.exports = { validateLogin, genToken };
// if (validatedEmail && validatedPassword) {
//   const token = genToken();
//   return res.status(200).json({ token });
// }