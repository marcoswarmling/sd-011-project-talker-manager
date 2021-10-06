const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');

const router = express.Router();

const regDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

const HTTP_OK_STATUS = 200;

// Funções complementares
const validateFile = rescue((req, _res, next) => {
  const result = fs.readFileSync('./talker.json');
  req.fileContent = JSON.parse(result);
  next();
});

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validateNameAndAge = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk1 = ((req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === null || typeof talk.rate === 'undefined') {
    return res.status(400).json(
      { message: ('O campo "talk" é obrigatório'
      + ' e "watchedAt" e "rate" não podem ser vazios') },
    );
  }
  next();
});

const validateTalk2 = ((req, res, next) => {
  const { talk } = req.body;
  if (!talk.watchedAt.match(regDate)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } if (!(talk.rate <= 5 && talk.rate >= 1) || !Number.isInteger(talk.rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
});

// Requisições
router.get('/', validateFile, (req, res) => {
  const { fileContent } = req;
  if (!fileContent.length) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(fileContent);
});

router.post('/', validateFile, validateToken, validateNameAndAge, validateTalk1, validateTalk2,
(req, res, _next) => {
  const { fileContent } = req;
  const { name, age, talk } = req.body;
  const newTalker = { id: fileContent.length + 1, name, age, talk };
  fileContent.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(fileContent), 'utf-8');
  res.status(201).json(newTalker);
});

router.get('/:id', validateFile, (req, res) => {
  const { id } = req.params;
  const { fileContent } = req;
  const foundTalker = fileContent.find((t) => t.id === parseInt(id, 10));
  if (!foundTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(foundTalker);
});

router.put('/:id', validateFile, validateToken, validateNameAndAge, validateTalk1, validateTalk2,
(req, res, _next) => {
  const { fileContent } = req;
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const newTalker = { name, age, talk };
  const talkerIndex = fileContent.findIndex((t) => t.id === parseInt(id, 10));

  if (talkerIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  fileContent[talkerIndex] = { ...fileContent[talkerIndex], ...newTalker };
  fs.writeFileSync('./talker.json', JSON.stringify(fileContent), 'utf-8');
  res.status(200).json({ id: parseInt(id, 10), ...newTalker });
});

router.delete('/:id', validateFile, validateToken,
(req, res, _next) => {
  const { fileContent } = req;
  const { id } = req.params;
  const talkerIndex = fileContent.findIndex((t) => t.id === parseInt(id, 10));

  if (talkerIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  fileContent.splice(talkerIndex, 1);
  fs.writeFileSync('./talker.json', JSON.stringify(fileContent), 'utf-8');
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
