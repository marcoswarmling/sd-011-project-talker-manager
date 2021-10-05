const express = require('express');

const { getAllTalkers, getTalkerById } = require('../controllers/talker');

const router = express.Router();

router.get('/', (_req, res, next) => {
  getAllTalkers()
    .then((talkers) => {
      res.status(200).json(talkers);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  getTalkerById(req.params.id)
    .then((talker) => {
      res.status(200).json(talker);
    })
    .catch(next);
});

module.exports = router;
