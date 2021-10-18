const readFile = require('./services/writeFile');
const writeFile = require('./services/writeFile');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const NOT_FOUND_STATUS = 404;
const TALKERS_FILE = 'talker.json';

const getAllTalkers = async (_req, res) => {
  const talkersList = await readFile(TALKERS_FILE);
  return res.status(OK_STATUS).json(talkersList);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile(TALKERS_FILE);
  const foundTalker = talkersList.find((talker) => talker.id === parseInt(id, 10));

  if (!foundTalker) {
    return res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(OK_STATUS).json(foundTalker);
};

const addTalker = async (req, res) => {
  const { body } = req;
  const talkersList = await readFile(TALKERS_FILE);

  const newTalker = {
    id: talkersList.length + 1,
    ...body,
  };

  talkersList.push(newTalker);
  await writeFile(TALKERS_FILE, JSON.stringify(talkersList));

  return res.status(CREATED_STATUS).json(newTalker);
};

const editTalker = async (req, res) => {
  const { id } = req.params;
  const newTalker = {
    ...req.body,
    id: parseInt(id, 10),
  };

  const talkersList = await readFile(TALKERS_FILE);
  const newTalkersList = talkersList.filter((talker) => talker.id !== parseInt(id, 10));
  newTalkersList.push(newTalker);
  await writeFile(TALKERS_FILE, JSON.stringify(newTalkersList));

  return res.status(OK_STATUS).json(newTalker);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile(TALKERS_FILE);
  const newTalkersList = talkersList.filter((talker) => talker.id !== parseInt(id, 10));
  await writeFile(TALKERS_FILE, JSON.stringify(newTalkersList));

  return res.status(OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const talkersList = await readFile(TALKERS_FILE);

  if (!q) {
    return res.status(OK_STATUS).json(talkersList);
  }

  const newTalkersList = talkersList.filter(({ name }) => name.includes(q));
  return res.status(OK_STATUS).json(newTalkersList);
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(BAD_REQUEST_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length <= 3) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(BAD_REQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }

  if (parseInt(age, 10) < 18) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(BAD_REQUEST_STATUS)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt) {
    return res.status(BAD_REQUEST_STATUS)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  const isDateValid = new RegExp(/\d\d\/\d\d\/\d\d\d\d/).test(watchedAt);
  if (!isDateValid) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!rate && parseInt(rate, 10) !== 0) {
    return res.status(BAD_REQUEST_STATUS)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  const isValidRate = new RegExp(/^[1-5]$/).test(rate);
  if (!isValidRate) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  addTalker,
  editTalker,
  deleteTalker,
  searchTalker,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};
