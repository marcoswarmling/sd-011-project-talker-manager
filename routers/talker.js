const express = require('express');

const { getAllTalkers } = require('../controllers/talker');

const router = express.Router();

router.get('/', (_req, res, next) => {
  getAllTalkers()
    .then((talkers) => {
      res.status(200).json(talkers);
    })
    .catch(next);
});

module.exports = router;
