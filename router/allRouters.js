/* 
https://medium.com/owinteractive/entendendo-o-express-router-e-usando-m%C3%B3dulos-de-forma-simples-24ca6723fe91 */

const router = require('express').Router();

const {
  validateEmail,
  validatePassword,
  getRandomToken,
  validateToken,
} = require('../middleware/validations');

router.post('/login', validateEmail, validatePassword, validateToken, getRandomToken);

module.exports = router;