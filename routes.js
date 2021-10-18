const express = require('express');

const router = express.Router();

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const createTalker = require('./middlewares/createTalker');
const editTalker = require('./middlewares/editTalker');
const deleteTalker = require('./middlewares/deleteTalker');
const searchTalker = require('./middlewares/searchTalker');

const {
  verifyLogin,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkContent,
} = require('./helper/validation');

router.get('/talker/search', verifyToken, searchTalker);
router.get('/talker', getAllTalkers);
router.get('/talker/:id', getTalkerById);
router.post('/login', verifyLogin);
router.post('/talker',
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkContent,
  createTalker);
router.put('/talker/:id',
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkContent,
  editTalker);
router.delete('/talker/:id', verifyToken, deleteTalker);

module.exports = router;
