const fs = require('fs').promises;

async function talkersList(_req, res) {
  const talkes = await fs
    .readFile('./talker.json', 'utf-8')
    .then((file) => JSON.parse(file));
  res.status(200).json(talkes);
}

async function talkerID(req, res) {
  const id = parseInt(req.params.id, 0);
  const talkers = await fs
    .readFile('./talker.json', 'utf-8')
    .then((file) => JSON.parse(file));
  const findId = talkers.find((talker) => talker.id === id);
  if (!findId) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(findId);
}

function createToken() {
  const alphabet = 'abcdefghijklmnopqrstuvxywz1234567890'.split('');
  const token = [];
  for (let index = 0; index < 16; index += 1) {
    const positionArray = Math.floor(Math.random() * 36);
    token.push(alphabet[positionArray]);
  }

  return token.join('');
}

async function validationEmail(email, res) {
  const rexexEmail = /[a-zA-Z0-9_]+@+[a-zA-Z0-9_]+.com/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!rexexEmail.test(email)) {
    console.log(email);
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return true;
}

async function validationPassword(password, res) {
  if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return true;
}

async function doLogin(req, res) {
  const { email, password } = req.body;
  if (validationEmail(email, res) && validationPassword(password, res)) {
    res.status(200).json({ token: createToken() });
  }
}

module.exports = { talkerID, talkersList, doLogin };
