const fs = require('fs').promises;
const crypto = require('crypto');

const messages = 'Pessoa palestrante não encontrada';
const HTTP_OK_STATUS = 200;

const loginToken = crypto.randomBytes(8).toString('hex');

const getToken = (req, res) => {
  res.status(200).send({
    token: loginToken,
  });
};

const getAllTalkers = async (req, res) => {
  try {
    const response = await fs.readFile('./talker.json', 'utf8');
    if (!response) return res.status(HTTP_OK_STATUS).json([]);

    res.status(HTTP_OK_STATUS).json(JSON.parse(response));
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTalkerById = async (req, res) => {
  try {
    const { id } = req.params;

    const talker = await fs.readFile('./talker.json', 'utf8');
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
    return res.status(400).json({ 
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16) {
    return res.status(400).json({
      message: 'Token inválido',
    }); 
  }
  next();
};

module.exports = { 
  getAllTalkers,
  getTalkerById,
  validEmail,
validToken,
validPassword,
getToken };