const routes = require('express').Router();
const talkerController = require('../controllers/talkerController');

routes.get('/', talkerController.getAllTalkers);

module.exports = routes;
