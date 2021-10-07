const express = require('express');
const talkersRead = require('./talkersRead');
const talkersWrite = require('./talkersWrite');
const talkerEdit = require('./talkerEdit');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const numberToken = 16;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== numberToken) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validationAddTalkerName = (req, res, next) => {
  const { name } = req.body;
  const minLengthName = 3;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < minLengthName) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validationAddTalkerAge = (req, res, next) => {
  const { age } = req.body;
  const minAge = 18;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 10) < minAge) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validationAddTalkerTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
     });
  }
  const { watchedAt, rate } = talk;
  if (!watchedAt || typeof (rate) !== 'number') {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
     });
  }
  next();
};

const validationAddTalkerTalkWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validationAddTalkerTalkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  const minRate = 1;
  const maxRate = 5;
  if (parseInt(rate, 10) < minRate || parseInt(rate, 10) > maxRate) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

router.get('/', async (req, res) => {
  const talkersPersons = await talkersRead();
  if (talkersPersons) return res.status(200).json(talkersPersons);
  res.status(200).json([]);
});

router.get('/:id', async (req, res) => {
  const talkersPersons = await talkersRead();
  const { id } = req.params;
  const talker = talkersPersons.find((person) => parseInt(person.id, 10) === parseInt(id, 10));
  if (talker) return res.status(200).json(talker);
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/', authMiddleware, validationAddTalkerName, validationAddTalkerAge,
 validationAddTalkerTalk, validationAddTalkerTalkRate, 
 validationAddTalkerTalkWatchedAt, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await talkersRead();
  const newTalkerId = talkers.length + 1;
  const newTalker = {
    name,
    age,
    id: newTalkerId,
    talk,
  };
  await talkersWrite(newTalker);
  res.status(201).json(newTalker);
});

router.put('/:id', authMiddleware, validationAddTalkerName, validationAddTalkerAge,
validationAddTalkerTalk, validationAddTalkerTalkRate, 
validationAddTalkerTalkWatchedAt, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkersEdited = await talkerEdit(id, name, age, talk);
  if (talkersEdited) return res.status(200).json({ id: parseInt(id, 10), name, age, talk });
});

module.exports = router;