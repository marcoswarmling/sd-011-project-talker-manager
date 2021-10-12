const express = require('express');
const getFile = require('../fs-utils');

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await getFile('./talker.json');

  if (response.length < 1) return res.status(200).json([]);

  res.status(200).json(response);
});

module.exports = router;
