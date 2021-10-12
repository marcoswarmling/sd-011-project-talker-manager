const express = require('express');
const controllers = require('../controllers/talker');
const middlewares = require('../middlewares/talker');

const arrayMiddlewares = [
  middlewares.checkToken,
  middlewares.checkName,
  middlewares.checkTalk,
  middlewares.checkAge,
  middlewares.checkRate,
  middlewares.checkDate,
];

const router = express.Router();

router.get('/talker/search', middlewares.checkToken, controllers.searchNameTalker);
router.get('/talker', controllers.getTalkers);
router.get('/talker/:id', controllers.getTalker);
router.post('/talker', arrayMiddlewares, controllers.insertTalker);
router.put('/talker/:id', arrayMiddlewares, controllers.updateTalker);
router.delete('/talker/:id', middlewares.checkToken, controllers.deleteTalker);

module.exports = router;