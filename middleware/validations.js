/* gerar token (sites pesquisados):
https://medium.com/@norbertofariasmedeiros/five-steps-como-gerar-um-random-token-em-javascript-1e1488a15d28

https://qastack.com.br/programming/8855687/secure-random-token-in-node-js

https://www.ti-enxame.com/pt/javascript/token-aleatorio-seguro-no-node.js/940938279/
 */

const crypto = require('crypto');
const fs = require('fs').promises;

const pathFile = './talker.json';

const getToken = crypto.randomBytes(8).toString('hex');
const getRandomToken = (req, res) => {
  res.status(200).send({ token: getToken });
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const reEmail = /\S+@\S+\.\S+/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!reEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if ((!talk.rate && talk.rate === 0) || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validatewatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const reDate = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!reDate.test(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const postTalker = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  try {
    const content = await fs.readFile(pathFile, 'utf8');
    const response = await JSON.parse(content);
    const newContent = {
      name,
      age,
      id: response.length + 1,
      talk: { watchedAt, rate },
    };
    response.push(newContent);
    await fs.writeFile('./talker.json', JSON.stringify(response));
    res.status(201).json(newContent);
  } catch (error) {
    return res.status(400).json(error);
  } 
};

/* Feito com ajuda do Mauricio Ieiri */
const putTalker = async (req, res) => {
  const { id } = req.params;
  try {  
    const content = await fs.readFile(pathFile, 'utf-8');
    const response = JSON.parse(content);
    const indexTalk = response.findIndex((item) => item.id === Number(id));   
    if (indexTalk === -1) return res.status(404).json({ message: 'Id não encontrado' });
    response[indexTalk] = { ...req.body, id: Number(id) };
    await fs.writeFile('./talker.json', JSON.stringify(response));
    return res.status(200).json(response[indexTalk]);
    } catch (error) {
      return res.status(400).json(error);
    }    
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await fs.readFile(pathFile, 'utf-8');
    const response = JSON.parse(content);
    const indexTalk = response.findIndex((item) => item.id === Number(id));
    response.splice(indexTalk, 1);
    await fs.writeFile('./talker.json', JSON.stringify(response));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return res.status(400).json(error);
  }
};

  module.exports = {
    getRandomToken,
    validateEmail,
    validatePassword,
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validatewatchedAt,
    validateRate,
    postTalker,
    putTalker,
    deleteTalker,
  };
