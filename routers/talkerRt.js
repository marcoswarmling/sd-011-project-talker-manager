const express = require('express');
// const fs = require('file-system');

const router = express.Router();

const {
  loadSpeakers,
} = require('../utils/utils');

router.use(loadSpeakers);

// task 1
router.get('/', (req, res) => {
  if (req.speakers.length === 0) {
    return res.status(200).json([]);
  }
  res.status(200).json(req.speakers);
});

// task 2
// status(404) = Not Found
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const spkfilter = req.speakers.filter((e) => e.id === parseInt(id, 10)); // decimal radix
  if (!id || spkfilter.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(spkfilter[0]);
});

module.exports = router;
