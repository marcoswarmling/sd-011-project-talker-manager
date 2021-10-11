const express = require('express');
const controllers = require('../controllers/talker');
const middlewares = require('../middlewares/talker');

const arrayMiddlewares = [
  middlewares.checkToken,
  middlewares.checkName,
  middlewares.checkTalk,
  middlewares.checkAge,
  middlewares.checkDate,
  middlewares.checkRate,
];

const router = express.Router();

router.get('/talker', controllers.getTalkers);
router.get('/talker/:id', controllers.getTalker);
router.post('/talker', arrayMiddlewares, controllers.insertTalker);

module.exports = router;