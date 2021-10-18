const fs = require('fs');

const readTalkers = () => {
  let result = [];
  try {
    const data = fs.readFileSync('talker.json', 'utf8');
    result = JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
  return result;
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const verifyName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const verifyTalkRate = (req, res, next) => {
  const { rate } = req.body.talk;
  const validRate = rate > 0 && rate < 6;
  if (!rate && rate !== 0) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!validRate) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const verifyTalkDate = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dateRegex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const verifyTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const getTalkerById = (req, res) => {
  const { id } = req.params;
  const filterTalker = readTalkers().find((talker) => talker.id === parseInt(id, 10));
  return (!filterTalker) ? (
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
  ) : (
    res.status(200).json(filterTalker)
  );
};

const getAllTalkers = (_req, res) => res.status(200).json(readTalkers());

const addTalker = (req, res, next) => {
  const talkers = readTalkers();
  const id = Math.max(...talkers.map((talker) => talker.id), 0) + 1;
  const newTalker = { id, ...req.body };

  const newTalkers = [...talkers, newTalker];
  try {
    fs.writeFileSync('talker.json', JSON.stringify(newTalkers));
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
  res.status(201).json(newTalker);
  next();
};

const editTalker = (req, res, next) => {
  const id = parseFloat(req.params.id);
  const talkers = readTalkers();
  const newTalkers = talkers.map((talker) => {
    if (talker.id === id) {
      return { ...req.body, id };
    }
    return talker;
  });
  try {
    fs.writeFileSync('talker.json', JSON.stringify(newTalkers));
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
  res.status(200).json({ id, ...req.body });
  next();
};

const deleteTalker = (req, res, next) => {
  const id = parseFloat(req.params.id);
  const talkers = readTalkers();
  const newTalkers = talkers.filter((talker) => talker.id !== id);
  try {
    fs.writeFileSync('talker.json', JSON.stringify(newTalkers));
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  next();
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  addTalker,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkDate,
  verifyTalkRate,
  editTalker,
  deleteTalker,
};
