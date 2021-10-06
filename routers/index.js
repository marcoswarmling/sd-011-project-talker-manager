const router = require('express').Router();
const fs = require('fs').promises;

const { getTalkers } = require('../readTalker');
const {
  AgeVerify,
  nameVerify,
  TokenCreation,
  IDVerification,
  TokenVerification,
  ratedVerification,
  EmailVerification,
  PasswordVerification,
  watchedAtVerification,
} = require('../authTalkers');

// Requisito 1

router.get('/talker', (_req, res) => {
  const talkers = getTalkers();
  res.status(200).send(talkers);
});

// Requisito 2

router.get('/talker/:id', IDVerification, (req, res) => {
  const { id } = req.params;
  const talkers = getTalkers();
  const filteredTalker = talkers.find(
    (talker) => Number(talker.id) === Number(id),
  );
  return res.status(200).json(filteredTalker);
});

// Requisito 3

router.post('/login', PasswordVerification, EmailVerification, TokenCreation);

// Requisito 4

router.post(
  '/talker',
  TokenVerification,
  watchedAtVerification,
  ratedVerification,
  nameVerify,
  AgeVerify,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = getTalkers();
    talkers.push({ id: talkers.length + 1, name, age, talk });
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
    return res.status(201).json({ id: talkers.length, name, age, talk });
  },
);

module.exports = router;