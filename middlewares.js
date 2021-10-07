const services = require('./services');

const { missingMessages, invalidMessages } = services;

const getAllTalkers = (req, res) => {
  const { talkers } = req;
  if (!talkers || talkers.length === 0) return res.status(200).json([]);
  res.status(200).json(talkers);
};

const getTalkerById = (req, res) => {
  const { id } = req.params;
  const { talkers } = req;
  const talker = talkers.find((eachTalker) => eachTalker.id === Number(id));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
  return talker;
};

const getToken = (req, res) => {
  const token = services.generateToken();
  const { email, password } = req.body;
  const isValidCredentials = services.validateCredentials(email, password);
  console.log(isValidCredentials);
  if (isValidCredentials.message) {
    return res.status(400).json({ message: isValidCredentials.message });
  }
  res.status(200).json({ token });
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token || token === '') return res.status(401).json({ message: missingMessages.token });
  const isValidToken = services.validateToken(token);
  if (!isValidToken) return res.status(401).json({ message: invalidMessages.token });
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: missingMessages.name });
  const isValidName = services.validateName(name);
  if (!isValidName) return res.status(400).json({ message: invalidMessages.name });
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: missingMessages.age });
  const isValidAge = services.validateAge(age);  
  if (!isValidAge) return res.status(400).json({ message: invalidMessages.age });
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const isValidRate = services.validateRate(rate);
  
  if (!rate || rate === '') return res.status(400).json({ message: missingMessages.talk });
  if (!isValidRate) return res.status(400).json({ message: invalidMessages.rate });
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const isValidWatchedAt = services.validateWatchedAt(watchedAt);
  
  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: missingMessages.talk });
  }
    if (!isValidWatchedAt) return res.status(400).json({ message: invalidMessages.watchedAt });
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const isValidTalk = services.validateTalk(talk);
  
  if (!talk) {
    return res.status(400).json({ message: missingMessages.talk });
  }
  if (!isValidTalk) return res.status(400).json({ message: missingMessages.talk });
  next();
};

const insertData = (req, res) => {
  const newTalker = req.body;
  const talkers = services.readFileTalker();
  const newId = talkers.length;
  newTalker.id = newId + 1;
  const newFile = [...talkers, newTalker];
  services.writeFileTalker(newFile);
  res.status(201).json(newTalker);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  getToken,
  validateToken,
  validateAge,
  validateName,
  validateWatchedAt,
  validateRate,
  validateTalk,
  insertData,
};