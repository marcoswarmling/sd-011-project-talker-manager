const router = require('express').Router();
const fs = require('fs').promises;

const {
  readTalkerFile,
  token,
  validateName,
  validateWatchedAt,
  validateRate,
} = require('../helper');

router.get('/', async (_req, res) => {
  readTalkerFile()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(({ message }) => res.status(500).json({ message }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  readTalkerFile()
    .then((data) => {
      const talker = data.find((t) => Number(t.id) === Number(id));
      if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      res.status(200).json(talker);
    })
    .catch(({ message }) => res.status(500).json({ message }));
});

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization !== token) return res.status(401).json({ message: 'Token inválido' });

  next();
}

function checkExistingTalkerData(req, res, next) {
  const { name, age, talk = { watchedAt: undefined, rate: undefined } } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (!talk.watchedAt || !talk.rate) {
    return res
      .status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  next();
}

function validateTalker(req, res, next) {
  const { name, age } = req.body;
  try {
    if (!validateName(name)) throw new Error('O "name" deve ter pelo menos 3 caracteres');
    if (Number(age) < 18) throw new Error('A pessoa palestrante deve ser maior de idade');
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  try {
    if (!validateWatchedAt(watchedAt)) {
      throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
    }
    if (!validateRate(rate)) throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
}

router.post(
  '/',
  validateToken,
  checkExistingTalkerData,
  validateTalker,
  validateTalk,
  (req, res) => {
    const { name, age, talk } = req.body;
    const talker = { name, age, talk };
    readTalkerFile()
      .then(async (data) => {
        const talkerData = {
          ...talker,
          id: data.length + 1,
        };
        await fs.writeFile('./talker.json', JSON.stringify([...data, talkerData], null, 2));
        res.status(201).json(talkerData);
      })
      .catch(({ message }) => res.status(500).json({ message }));
  },
);

module.exports = router;
