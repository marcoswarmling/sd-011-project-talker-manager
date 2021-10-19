const { StatusCodes } = require('http-status-codes');

const readFile = require('../services/readFile');
const writeFile = require('../services/writeFile');

const talkerJson = 'talker.json';

const getAllTalkers = async (req, res) => {
  const talkers = await readFile(talkerJson);
  return res.status(StatusCodes.OK).json(talkers);
};

const getIdTalkers = async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile(talkerJson);

  const talkerId = talkersList.find((talker) => talker.id === parseInt(id, 10));

  if (!talkerId) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(StatusCodes.OK).json(talkerId);
};

const addTalker = async (req, res) => {
  const { body } = req;
  const talkersList = await readFile(talkerJson);

  const newTalker = {
    id: talkersList.length + 1,
    ...body,
  };

  talkersList.push(newTalker);
  await writeFile(talkerJson, JSON.stringify(talkersList));
  
  return res.status(StatusCodes.CREATED).json(newTalker);
};

const editTalker = async (req, res) => {
  const { id } = req.params;
  const newTalker = {
    ...req.body,
    id: parseInt(id, 10),
  };

  const talkersList = await readFile(talkerJson);
  const newTalkersList = talkersList.filter((talker) => talker.id !== parseInt(id, 10));
  newTalkersList.push(newTalker);
  await writeFile(talkerJson, JSON.stringify(newTalkersList));

  return res.status(StatusCodes.OK).json(newTalker);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile(talkerJson);
  const newTalkersList = talkersList.filter((talker) => talker.id !== parseInt(id, 10));
  await writeFile(talkerJson, JSON.stringify(newTalkersList));

  return res.status(StatusCodes.OK).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

const searchTalker = async (req, res) => {
  const { q } = req.query;
    const talkersList = await readFile(talkerJson);

    if (!q || q === '') return res.status(StatusCodes.OK).json(talkersList);

    const newTalkersList = talkersList.filter(({ name }) => name.includes(q));
    if (!newTalkersList) return res.status(StatusCodes.OK).json([]);
    return res.status(StatusCodes.OK).json(newTalkersList);
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === '') {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length <= 3) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }

  if (parseInt(age, 10) < 18) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  const isDateValid = new RegExp(/\d\d\/\d\d\/\d\d\d\d/).test(watchedAt);
  if (!isDateValid) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!rate && parseInt(rate, 10) !== 0) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  const isValidRate = new RegExp(/^[1-5]$/).test(rate);
  if (!isValidRate) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  getAllTalkers,
  getIdTalkers,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  addTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};
