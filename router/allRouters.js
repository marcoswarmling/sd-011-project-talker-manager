/* 
https://medium.com/owinteractive/entendendo-o-express-router-e-usando-m%C3%B3dulos-de-forma-simples-24ca6723fe91 */

const router = require('express').Router();

const {
  validateEmail,
  validatePassword,
  getRandomToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validatewatchedAt,
  validateRate,
  postTalker,
} = require('../middleware/validations');

router.post('/login', validateEmail, validatePassword, getRandomToken);
router.post('/talker',
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk,
  validateRate,
  validatewatchedAt, 
  postTalker);

module.exports = router;