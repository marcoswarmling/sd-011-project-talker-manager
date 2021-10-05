const router = require('express').Router();

const { getTalkers, getTalkerById } = require('../middlewares/validations');

router.get('/talker', getTalkers);
router.get('/talker/:id', getTalkerById);

module.exports = router;