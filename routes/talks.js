// importa o router
const router = require('express').Router();
const talksController = require('../controllers/talksControllers');

router.get('/', talksController.getAllTalks);

// router.get('/names/:id', moviesController.getMovieById);

module.exports = router;