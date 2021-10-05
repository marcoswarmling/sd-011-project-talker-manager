const router = require('express').Router();

const { getAllTalkers, 
  getTalkerById } = require('../middlewares/validation');

router.get('/talker', getAllTalkers);
router.get('/talker/:id', getTalkerById);

module.exports = router;