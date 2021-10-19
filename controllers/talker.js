const { StatusCodes } = require('http-status-codes');

const readFile = require('../services/readFile');
const writeFile = require('../services/writeFile');

const getAllTalkers = async (req, res) => {
  const talkers = await readFile('talker.json');
  return res.status(StatusCodes.OK).json(talkers);
};

const getIdTalkers = async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile('talker.json');

  const talkerId = talkersList.find((talker) => talker.id === parseInt(id, 10));

  if (!talkerId) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(StatusCodes.OK).json(talkerId);
};

const tokenValid = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Token inválido' });
  }

  next();
};

const nameValid = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O campo "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageValid = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 10) < 18) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const watchedAtValid = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  const watchedAtRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!watchedAtRegex.test(watchedAt)) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const rateValid = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  
  if (rate > 5 || rate < 1) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const talkValid = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const addTalker = async (req, res) => {
  const { body } = req;
  const talkersList = await readFile('talker.json');

  const newTalker = {
    id: talkersList.length + 1,
    ...body,
  };

  talkersList.push(newTalker);
  await writeFile('talker.json', JSON.stringify(talkersList));
  
  return res.status(StatusCodes.CREATED).json(newTalker);
};

module.exports = {
  getAllTalkers,
  getIdTalkers,
  tokenValid,
  nameValid,
  ageValid,
  watchedAtValid,
  rateValid,
  talkValid,
  addTalker,
};
