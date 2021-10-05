const router = require('express').Router();

const { getTalkers, getTalkerById, emailValidation, passwordValidation, getToken, tokenValidation } = require('../middlewares/validations');

router.get('/talker', getTalkers);
router.get('/talker/:id', getTalkerById);
router.post('/login', emailValidation, passwordValidation, getToken);

module.exports = router;