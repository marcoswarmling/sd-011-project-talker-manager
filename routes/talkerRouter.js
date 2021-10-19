const express = require('express');
const fs = require('fs');
const { validateWatchedAt, validateRate } = require('../helpers/validateTalk');
// const { validateToken } = require('../helpers/validateToken');
const { authValidator } = require('../middlewares/authValidator');

const talkerJsonPath = './talker.json';

const talkerRouter = express.Router();

talkerRouter.get('/search',
authValidator,
async (req, res) => {
  const { q } = req.query;

  const data = await fs.readFileSync(talkerJsonPath, 'utf-8');
  const talkers = JSON.parse(data);

  if (!q || q === '') return res.status(200).send(talkers);

  const filteredTalkers = talkers.filter((t) => t.name.includes(q));

  return res.status(200).send(filteredTalkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFileSync(talkerJsonPath, 'utf-8');
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === Number(id));

  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).send(talker);
});

talkerRouter.get('/', async (_req, res) => {
  const data = await fs.readFileSync(talkerJsonPath, 'utf-8');
  const talkers = JSON.parse(data);

  if (!talkers.length) return res.status(200).send([]);

  return res.status(200).send(talkers);
});

talkerRouter.post('/',
/* (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).send({ message: 'Token não encontrado' });

  if (!validateToken(token)) return res.status(401).send({ message: 'Token inválido' });

  next();
} */
authValidator,
(req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
},
(req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') return res.status(400).send({ message: 'O campo "age" é obrigatório' });

  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
},
(req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || !talk.rate) {
    const message = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
    return res.status(400).send({ message });
  }

  next();
},
(req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  if (!validateWatchedAt(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!validateRate(rate)) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
},
async (req, res) => {
  const { body } = req;

  const data = await fs.readFileSync(talkerJsonPath, 'utf-8');
  const talkers = JSON.parse(data);
  const newTalker = { id: talkers[talkers.length - 1].id + 1, ...body };

  await fs.writeFileSync(talkerJsonPath, JSON.stringify([...talkers, newTalker]));

  return res.status(201).send({ ...newTalker });
});

module.exports = talkerRouter;