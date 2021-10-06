const router = require('express').Router();

const {
  AgeVerify,
  nameVerify,
  validTalk,
  talkerSetter,
  modifyTalker,
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

// Requisito 5

router.put(
  '/talker/:id', 
  TokenVerification, 
  nameVerify, 
  AgeVerify, 
  validTalk, 
  watchedAtVerification, 
  ratedVerification, 
  modifyTalker,
);

module.exports = router;