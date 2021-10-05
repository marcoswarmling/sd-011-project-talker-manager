/* gerar token (sites pesquisados):
https://medium.com/@norbertofariasmedeiros/five-steps-como-gerar-um-random-token-em-javascript-1e1488a15d28

https://qastack.com.br/programming/8855687/secure-random-token-in-node-js

https://www.ti-enxame.com/pt/javascript/token-aleatorio-seguro-no-node.js/940938279/
 */

const crypto = require('crypto');

const HTTP_OK_STATUS = 200;

const getToken = crypto.randomBytes(8).toString('hex');
const getRandomToken = (req, res) => {
  res.status(HTTP_OK_STATUS).send({ token: getToken });
};

const validateToken = (req, res, next) => {
  const { authorize } = req.headers;
  if (!authorize) {
    return res.status(400).json({ message: 'Token não encontrado' });
  }
  const magicNumber = 16;
  if (authorize.length !== magicNumber) {
    return res.status(400).json({ message: 'Token inválido' });
  }
  next();
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
  validateToken,
  validateEmail,
  validatePassword,
};
