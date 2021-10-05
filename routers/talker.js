const express = require('express');

const validateToken = require('../middlewares/validateToken');
const {
  getAllTalkers,
  getTalkerById,
  addTalker,
  editTalker,
  deleteTalker,
  searchTalker,
} = require('../controllers/talker');

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

router.get('/search', validateToken, (req, res, next) => {
  const { q = '' } = req.query;

  searchTalker(q)
    .then((foundTalkers) => {
      res.status(200).json(foundTalkers);
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

router.put('/:id', validateToken, (req, res, next) => {
  editTalker(req.params.id, req.body)
    .then((talker) => {
      res.status(200).json(talker);
    })
    .catch(next);
});

router.delete('/:id', validateToken, (req, res, next) => {
  deleteTalker(req.params.id)
    .then((message) => {
      res.status(200).json({ message });
    })
    .catch(next);
});

module.exports = router;
