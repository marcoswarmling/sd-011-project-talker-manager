const routes = require('express').Router();
const talkerController = require('../controllers/talkerController');

routes.get('/', talkerController.getAllTalkers);
routes.get('/:id', talkerController.getTalkersID);

module.exports = routes;
