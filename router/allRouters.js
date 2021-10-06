/* 
https://medium.com/owinteractive/entendendo-o-express-router-e-usando-m%C3%B3dulos-de-forma-simples-24ca6723fe91 */

const router = require('express').Router();

const {
  validateEmail,
  validatePassword,
  getRandomToken,
} = require('../middleware/validations');

router.post('/login', validateEmail, validatePassword, getRandomToken);

module.exports = router;