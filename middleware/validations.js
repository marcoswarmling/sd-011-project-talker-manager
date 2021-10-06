/* gerar token (sites pesquisados):
https://medium.com/@norbertofariasmedeiros/five-steps-como-gerar-um-random-token-em-javascript-1e1488a15d28

https://qastack.com.br/programming/8855687/secure-random-token-in-node-js

https://www.ti-enxame.com/pt/javascript/token-aleatorio-seguro-no-node.js/940938279/
 */

const crypto = require('crypto');

const getToken = crypto.randomBytes(8).toString('hex');
const getRandomToken = (req, res) => {
  res.status(200).send({ token: getToken });
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const reEmail = /\S+@\S+\.\S+/;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!reEmail.test(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  const magicNumber = 6;
  if (password.length < magicNumber) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  getRandomToken,
  validateEmail,
  validatePassword,
};
