const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', async (_req, res) => {
  const data = await fs.readFileSync('./talker.json', 'utf-8');
  if (!JSON.parse(data).length) return res.status(200).send([]);
  return res.status(200).send(JSON.parse(data));
});

module.exports = router;