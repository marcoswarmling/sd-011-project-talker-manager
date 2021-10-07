const router = require('express').Router();

const {
  AgeVerify,
  nameVerify,
  validTalk,
  deleteTalker,
  talkerSetter,
  modifyTalker,
  TokenCreation,
  getAllTalkers,
  IDVerification,
  TokenVerification,
  ratedVerification,
  EmailVerification,
  searchFieldChecker,
  PasswordVerification,
  watchedAtVerification,
} = require('../authTalkers');

// Requisito 1

router.get('/talker', getAllTalkers);

// Requisito 7

router.get('/talker/search', TokenVerification, searchFieldChecker);

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

// Requisito 6

router.delete('/talker/:id', TokenVerification, deleteTalker);

module.exports = router;