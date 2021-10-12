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

function passwordExists(password) {
  return password !== null && typeof password !== 'undefined';
}

function isPasswordlValid(password) {
  return password.length >= 6;
}

function passwordValidaded(password, res) {
  if (!passwordExists(password)) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
    return;
  }
  if (!isPasswordlValid(password)) {
    res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    return;
  }
  return true;
}

function isEmailValid(email) {
  const rexexEmail = /[a-zA-Z0-9_]+@+[a-zA-Z0-9_]+.com/;
  return rexexEmail.test(email);
}

function emailExists(email) {
  return email !== null && typeof email !== 'undefined';
}

function emailValidaded(email, res) {
  if (!emailExists(email)) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
    return;
  }
  if (!isEmailValid(email)) {
    res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
}

async function doLogin(req, res) {
  const { email, password } = req.body;
  if (passwordValidaded(password, res) && emailValidaded(email, res)) {
    return res.status(200).json({ token: createToken() });
  }
}

function tokenExist(token) {
  return token !== null && typeof token !== 'undefined';
}

function isTokenValid(token) {
  return token.length >= 16;
}

function validateToken(req, res) {
  if (!tokenExist(req.headers.authorization)) {
    res.status(401).json({ message: 'Token não encontrado' });
    return;
  }
  if (!isTokenValid(req.headers.authorization)) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }
  return true;
}

function nameExist(Name) {
  return Name !== null && typeof Name !== 'undefined';
}

function isNameValid(name) {
  return name.length >= 3;
}

function validateName(req, res) {
  const { name } = req.body;
  if (!nameExist(name)) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
    return;
  }
  if (!isNameValid(name)) {
    res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    return;
  }
  return true;
}

function ageExist(age) {
  return age !== null && typeof age !== 'undefined';
}

function isAgeValid(age) {
  return age >= 18;
}

function validateAge(req, res) {
  const { age } = req.body;
  if (!ageExist(age)) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
    return;
  }
  if (!isAgeValid(age)) {
    res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    return;
  }
  return true;
}

function WachedAtExist(watchedAt) {
  return watchedAt !== null && typeof watchedAt !== 'undefined';
}

function isWachedAtValid(watchedAt) {
  const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return regexData.test(watchedAt);
}

function validateWachedAt(res, talk) {
  if (!WachedAtExist(talk.watchedAt)) {
    res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
    return;
  }
  if (!isWachedAtValid(talk.watchedAt)) {
    res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    return;
  }
  return true;
}

function rateExist(Rate) {
  return Rate !== null && typeof Rate !== 'undefined';
}

function isARateValid(Rate) {
  return Rate < 6 && Rate > 0;
}

function validateTalkRate(res, talk) {
  if (!rateExist(talk.rate)) {
    res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
    return;
  }
  if (!isARateValid(talk.rate)) {
    res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    return;
  }
  return true;
}

function TalkExist(talk) {
  return talk !== null && typeof talk !== 'undefined';
}

function validateTalk(req, res) {
  const { talk } = req.body;
  if (!TalkExist(talk)) {
    res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
    return;
  }
  if (validateWachedAt(res, talk) && validateTalkRate(res, talk)) {
    return true;
  }
}

async function addTalker(req, res) {
  const newTalker = req.body;

  const fileTalkerList = await fs
    .readFile('./talker.json', 'utf-8')
    .then((file) => JSON.parse(file));

  if (
    validateToken(req, res)
    && validateName(req, res)
    && validateAge(req, res)
    && validateTalk(req, res)
  ) {
    newTalker.id = fileTalkerList.length + 1;
    fileTalkerList.push(newTalker);
    await fs.writeFile('./talker.json', JSON.stringify(fileTalkerList));

    return res.status(201).json(newTalker);
  }
}

module.exports = { talkerID, talkersList, doLogin, addTalker };
