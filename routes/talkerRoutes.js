const express = require('express');
const Talker = require('../middlewares/talkersMiddlewares');

const router = express.Router();
  
router.get('/:q', Talker.blabla);
router.get('/', Talker.getAllTalkers);
router.get('/:talkerId', Talker.getTalkerById);

module.exports = router;