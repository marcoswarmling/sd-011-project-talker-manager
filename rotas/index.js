const router = require('express').Router();

const {
  getArrayTalkers,
  getTalkerId,
  validateEmail,
  validatePassword,
  getToken,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateTalk,
  resObj,
  resObjID,
  deleteTalker,
} = require('../middlewares/index');

router.get('/talker', getArrayTalkers);
router.get('/talker/:id', getTalkerId);
router.post('/login', validateEmail, validatePassword, getToken);
router.post('/talker', validateToken, validateName, validateAge,
validateTalk, validateDate, validateRate, resObj);
router.put('/talker/:id', validateToken, validateName, validateAge,
validateTalk, validateDate, validateRate, resObjID);
router.delete('/talker/:id', validateToken, deleteTalker);

module.exports = router;
