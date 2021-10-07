const express = require('express');
const mid = require('./middlewares');

const router = express.Router();

router.get('/', mid.getAllTalkers);
router.get('/:id', mid.getTalkerById);

router.post('/',
  mid.validateToken,
  mid.validateName,
  mid.validateAge,
  mid.validateTalk,
  mid.validateRate,
  mid.validateWatchedAt,
  mid.insertData);

router.put('/:id', 
  mid.validateToken,
  mid.validateName,
  mid.validateAge,
  mid.validateTalk,
  mid.validateRate,
  mid.validateWatchedAt,
  mid.updateData);

router.delete('/:id', mid.validateToken, mid.deleteData);

module.exports = router;
