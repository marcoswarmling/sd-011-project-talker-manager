const router = require('express').Router();

const loginController = require('../controllers/login');

router.post('/', 
  loginController.emailValidate, 
  loginController.passwordValidate, 
  loginController.createToken);

module.exports = router;
