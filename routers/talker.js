const express = require('express');

const validateToken = require('../middlewares/validateToken');
const { getAllTalkers, getTalkerById, addTalker } = require('../controllers/talker');

const router = express.Router();

router.get('/', (_req, res, next) => {
  getAllTalkers()
    .then((talkers) => {
      res.status(200).json(talkers);
    })
    .catch(next);
});

router.post('/', validateToken, (req, res, next) => {
  addTalker(req.body)
    .then((result) => {
      res.status(201).json(result);
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
