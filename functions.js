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
    return;
  }
  return true;
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

function validaToken(token) {
  if (!tokenExist(token)) {
    return { valido: false, message: 'Token não encontrado' };
  }
  if (!isTokenValid(token)) {
    return { valido: false, message: 'Token inválido' };
  }
  return { valido: true };
}

function nameExist(Name) {
  return Name !== null && typeof Name !== 'undefined';
}

function isNameValid(name) {
  return name.length >= 3;
}
function validaNome(nome) {
  if (!nameExist(nome)) {
    return { valido: false, message: 'O campo "name" é obrigatório' };
  }
  if (!isNameValid(nome)) {
    return {
      valido: false,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  }
  return { valido: true };
}

function ageExist(age) {
  return age !== null && typeof age !== 'undefined';
}

function isAgeValid(age) {
  return age >= 18;
}

function validaIdade(idade) {
  if (!ageExist(idade)) {
    return { valido: false, message: 'O campo "age" é obrigatório' };
  }
  if (!isAgeValid(idade)) {
    return {
      valido: false,
      message: 'A pessoa palestrante deve ser maior de idade',
    };
  }
  return { valido: true };
}

function WachedAtExist(watchedAt) {
  return watchedAt !== null && typeof watchedAt !== 'undefined';
}

function isWachedAtValid(watchedAt) {
  const regexData =
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return regexData.test(watchedAt);
}

function validaData(data) {
  if (!WachedAtExist(data)) {
    return {
      valido: false,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  if (!isWachedAtValid(data)) {
    return {
      valido: false,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }
  return { valido: true };
}

function rateExist(Rate) {
  return Rate !== null && typeof Rate !== 'undefined';
}

function isARateValid(Rate) {
  return Rate < 6 && Rate > 0;
}

function validaNota(nota) {
  if (!rateExist(nota)) {
    return {
      valido: false,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  if (!isARateValid(nota)) {
    return {
      valido: false,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
  }
  return { valido: true };
}

function TalkExist(talk) {
  return talk !== null && typeof talk !== 'undefined';
}

function validaPalestra(palestra) {
  if (!TalkExist(palestra)) {
    return {
      valido: false,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }

  return { valido: true };
}

async function carregarDB() {
  return fs.readFile('./talker.json', 'utf-8').then((file) => JSON.parse(file));
}

function gravaDB(conteudo) {
  return fs.writeFile('./talker.json', JSON.stringify(conteudo));
}

function makeErrorMessage(msg) {
  return { message: msg };
}

function validacoiso(req) {
  const validacoes = [
    validaNome(req.body.name),
    validaIdade(req.body.age),
    validaPalestra(req.body.talk),
    validaData(req.body.talk && req.body.talk.watchedAt),
    validaNota(req.body.talk && req.body.talk.rate),
  ];

  return validacoes.find((resultado) => !resultado.valido) || { valido: true };
}

// function validaTalkerP1(req, res) {
//   const checkNome = validaNome(req.body.name);
//   if (!checkNome.valido) {
//     res.status(400).json(makeErrorMessage(checkNome.message));
//     return false;
//   }
//   const checkIdade = validaIdade(req.body.age);
//   if (!checkIdade.valido) {
//     res.status(400).json(makeErrorMessage(checkIdade.message));
//     return false;
//   }
//   const checkData = validaData(req.body.talk.watchedAt);
//   if (!checkData.valido) {
//     res.status(400).json(makeErrorMessage(checkData.message));
//     return false;
//   }
//   return true;
// }

// function validaTalkerP2(req, res) {
//   const checkNota = validaNota(req.body.talk.rate);
//   if (!checkNota.valido) {
//     res.status(400).json(makeErrorMessage(checkNota.message));
//     return false;
//   }
//   const checkPalestra = validaPalestra(req.body.talk);
//   if (!checkPalestra.valido) {
//     res.status(400).json(makeErrorMessage(checkPalestra.message));
//     return false;
//   }
//   return true;
// }

// function validaTalker(req, res) {
//   return validaTalkerP1(req, res) && validaTalkerP2(req, res);
// }

async function addTalker(req, res) {
  const checkToken = validaToken(req.headers.authorization);
  if (!checkToken.valido) {
    res.status(401).json(makeErrorMessage(checkToken.message));
    return;
  }

  const validacaoTalker = validacoiso(req);
  if (!validacaoTalker.valido) {
    res.status(400).json(makeErrorMessage(validacaoTalker.message));
    return;
  }

  const fileTalkerList = await carregarDB();
  const newTalker = req.body;
  newTalker.id = fileTalkerList.length + 1;
  fileTalkerList.push(newTalker);
  await gravaDB(fileTalkerList);
  res.status(201).json(newTalker);
}

async function editTalker(req, res) {
  const checkToken = validaToken(req.headers.authorization);
  if (!checkToken.valido) {
    res.status(401).json(makeErrorMessage(checkToken.message));
    return;
  }
  const validacaoTalker = validacoiso(req);
  if (!validacaoTalker.valido) {
    res.status(400).json(makeErrorMessage(validacaoTalker.message));
    return;
  }

  const talkeredited = req.body;
  const params = req.params.id;
  const fileTalkerList = await carregarDB();
  const target = fileTalkerList.find((talker) => params === talker.id);
  if (!target) {
    res.status(404).send('registro não encontrado');
    return;
  }
  target.name = req.body.name;
  target.age = req.body.age;
  target.talk = req.body.talk;
  await gravaDB(fileTalkerList);
  res.status(200).json(talkeredited);
}

module.exports = { talkerID, talkersList, doLogin, addTalker, editTalker };
