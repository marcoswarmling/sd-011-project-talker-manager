const router = require('express').Router();

const {
  getTalkers,
  getTalkerId,
  setValidPassword,
  setValidEmail,
  createToken,
 } = require('../middlewares/validation');

router.get('/talker', getTalkers);

router.get('/talker/:id', getTalkerId);

router.post('/login', setValidPassword, setValidEmail, createToken);

module.exports = router;