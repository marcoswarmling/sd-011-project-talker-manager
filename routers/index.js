const router = require('express').Router();

const {
  AgeVerify,
  nameVerify,
  validTalk,
  talkerSetter,
  TokenCreation,
  getAllTalkers,
  IDVerification,
  TokenVerification,
  ratedVerification,
  EmailVerification,
  PasswordVerification,
  watchedAtVerification,
} = require('../authTalkers');

// Requisito 1

router.get('/talker', getAllTalkers);

// Requisito 2

router.get('/talker/:id', IDVerification);

// Requisito 3

router.post('/login', PasswordVerification, EmailVerification, TokenCreation);

// Requisito 4

router.post(
  '/talker',
  TokenVerification,
  validTalk,
  ratedVerification,
  watchedAtVerification,
  AgeVerify,
  nameVerify,
  talkerSetter,
);

module.exports = router;