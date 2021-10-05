const router = require('express').Router();

const {
  getTalkers,
  getTalkerId,
  setValidPassword,
  setValidEmail,
  createToken,
  setValidTalk,
  setValidLength,
  setValidName,
  setValidAge,
  postPalestrante,
  generateToken,
  findPalestrantAndModify,
  deletePalestrant,
  regexForWatched,
  searchPalestrantByName,
 } = require('../middlewares/validation');

router.get('/talker', getTalkers);

router.get('/talker/search', generateToken, searchPalestrantByName);

router.get('/talker/:id', getTalkerId);

router.post('/login', setValidPassword, setValidEmail, createToken);

router.put(
  '/talker/:id', setValidName, setValidAge, setValidTalk, generateToken, findPalestrantAndModify,
  );

router.post('/talker',
generateToken, 
setValidTalk, 
setValidLength,
regexForWatched,
setValidName, 
setValidAge, 
postPalestrante);

router.delete('/talker/:id', generateToken, deletePalestrant);

module.exports = router;