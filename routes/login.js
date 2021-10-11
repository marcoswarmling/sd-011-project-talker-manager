const express = require('express');
const controllers = require('../controllers/login');
const middlewares = require('../middlewares/login');

const router = express.Router();

router.post('/login', middlewares.checkLogin, controllers.login);

module.exports = router;