const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const { SUCCESS_OK } = require('../helpers/statuscode');

router.get('/', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);
  return res.status(SUCCESS_OK).json(talker);
});
