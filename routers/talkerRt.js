const express = require('express');
// const fs = require('file-system');

const router = express.Router();

const {
  loadSpeakers,
} = require('../utils/utils');

router.use(loadSpeakers);

router.get('/', (req, res) => {
  if (req.speakers.length === 0) return res.status(200).json([]);
  res.status(200).json(req.speakers);
});

module.exports = router;
