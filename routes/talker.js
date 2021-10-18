// importa o router
const router = require('express').Router();
const talksController = require('../controllers/talksControllers');

router.get('/', talksController.getAllTalks);

router.get('/:id', talksController.getIdTalks);

module.exports = router;