const router = require('express').Router();

const {
  getAllTalkers, 
  getTalkerById,
  validEmail,
  validPassword,
  getToken,
} = require('../middlewares/validation');

router.get('/talker', getAllTalkers);
router.get('/talker/:id', getTalkerById);
router.post('/login', validPassword, validEmail, getToken);

module.exports = router;