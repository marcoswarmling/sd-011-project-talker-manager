const router = require('express').Router();

const { 
getTalkers, 
getTalkerById, 
emailValidation, 
passwordValidation, 
getToken, 
tokenValidation, 
nameValidation, 
ageValidation, 
talkValidation, 
watchedAtValidation, 
rateValidation, 
postTalker, 
putTalker } = require('../middlewares/validations');

router.get('/talker', getTalkers);
router.get('/talker/:id', getTalkerById);
router.post('/login', emailValidation, passwordValidation, getToken);
router.post('/talker', 
  tokenValidation, 
  nameValidation, 
  ageValidation, 
  talkValidation, 
  watchedAtValidation, 
  rateValidation, 
  postTalker);
router.put('/talker/:id', 
  tokenValidation, 
  nameValidation, 
  ageValidation, 
  talkValidation, 
  watchedAtValidation, 
  rateValidation, 
  putTalker);

module.exports = router;