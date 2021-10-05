const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const db = './talker.json';

router.get('/', async (_req, res) => {
  const response = await fs.readFile(db, 'utf-8');
  if (response.length === 0) return res.status(200).send([]);
  return res.status(200).json(JSON.parse(response));
});

module.exports = router;