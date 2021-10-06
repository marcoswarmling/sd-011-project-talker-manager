const fs = require('fs').promises;
const crypto = require('crypto');

const messages = 'Pessoa palestrante não encontrada';
const deleteT = 'Pessoa palestrante deletada com sucesso';
const HTTP_OK_STATUS = 200;
const path = './talker.json';

const loginToken = crypto.randomBytes(8).toString('hex');

const getToken = (req, res) => {
  res.status(200).send({
    token: loginToken,
  });
};

const getAllTalkers = async (req, res) => {
  try {
    const response = await fs.readFile(path, 'utf8');
    if (!response) return res.status(HTTP_OK_STATUS).json([]);

    res.status(HTTP_OK_STATUS).json(JSON.parse(response));
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTalkerById = async (req, res) => {
  try {
    const { id } = req.params;

    const talker = await fs.readFile(path, 'utf8');
    const result = JSON.parse(talker);
    const response = result.find((value) => value.id === Number(id));

    if (!response) return res.status(404).json({ message: messages });

    res.status(HTTP_OK_STATUS).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return res.status(400).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const validEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!(email.includes('@') && email.includes('.com'))) {
    return res.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ 
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    }); 
  }
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).send({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (Number(age) < 18) {
    return res.status(400).send({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  // Jean Esteves me ajudou a resolver o erro que estava acontecendo no desafio 4;
  next();
};

const validWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const verify = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!verify.test(talk.watchedAt)) {
    return res.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
 
  next();
};

const validRate = (req, res, next) => {
  const { talk } = req.body;
  if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (!talk.rate) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
 
  next();
};

const setTalker = async (req, res) => {
  const { name, age, talk: { rate, watchedAt } } = req.body;

  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);

  const newTalker = {
    name,
    age,
    id: result.length + 1,
    talk: {
      rate,
      watchedAt,
    },
  };
  result.push(newTalker);
  await fs.writeFile(path, JSON.stringify(result));
  res.status(201).send(newTalker);
};

const setEditTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { rate, watchedAt } } = req.body;
  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);
  const talk = {
    name,
    age,
    id: Number(id),
    talk: {
      rate,
      watchedAt,
    },
  };
  const talkIndex = result.findIndex((value) => value.id === Number(id));
  result[talkIndex] = talk;
  await fs.writeFile(path, JSON.stringify(result));
  res.status(200).send(talk);
};



module.exports = { 
  getAllTalkers,
  getTalkerById,
  validEmail,
  validToken,
  validPassword,
  getToken,
  validRate,
  validWatchedAt,
  validTalk,
  validAge,
  validName,
  setTalker,
  setEditTalker,
};