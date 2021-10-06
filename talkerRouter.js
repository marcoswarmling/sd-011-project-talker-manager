const express = require('express');
const mid = require('./middlewares');

const router = express.Router();

router.get('/', mid.getAllTalkers);
router.get('/:id', mid.getTalkerById);
router.post(
  '/',
  mid.validateToken,
  mid.validateName,
  mid.validateAge,
  mid.validateRate,
  mid.validateTalk,
  mid.validateWatchedAt,
  mid.insertData,
);

module.exports = router;
