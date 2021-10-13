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
  // const regexData =
  //   /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
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

function validaParametros(req) {
  const validacoes = [
    validaNome(req.body.name),
    validaIdade(req.body.age),
    validaPalestra(req.body.talk),
    validaData(req.body.talk && req.body.talk.watchedAt),
    validaNota(req.body.talk && req.body.talk.rate),
  ];

  return validacoes.find((resultado) => !resultado.valido) || { valido: true };
}

async function addTalker(req, res) {
  const checkToken = validaToken(req.headers.authorization);
  if (!checkToken.valido) {
    res.status(401).json(makeErrorMessage(checkToken.message));
    return;
  }

  const validacaoTalker = validaParametros(req);
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

function validaParametrosEditTalker(req, res) {
  const checkToken = validaToken(req.headers.authorization);
  if (!checkToken.valido) {
    res.status(401).json(makeErrorMessage(checkToken.message));
    return false;
  }
  const validacaoTalker = validaParametros(req);
  if (!validacaoTalker.valido) {
    res.status(400).json(makeErrorMessage(validacaoTalker.message));
    return false;
  }
  return true;
}

async function editTalker(req, res) {
  if (!validaParametrosEditTalker(req, res)) {
    return;
  }
  const id = parseInt(req.params.id, 0);
  const fileTalkerList = await carregarDB();
  const target = fileTalkerList.find((talker) => id === talker.id);
  if (!target) {
    res.status(404).send('registro não encontrado');
    return;
  }
  target.name = req.body.name;
  target.age = req.body.age;
  target.talk = req.body.talk;
  await gravaDB([target]);
  res.status(200).json(target);
}

module.exports = { talkerID, talkersList, addTalker, editTalker };
