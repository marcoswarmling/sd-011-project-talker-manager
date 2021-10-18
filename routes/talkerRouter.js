const express = require('express');

const router = express.Router();
const fs = require('fs');

router.get('/talker', async (_req, res) => {
  const data = await fs.readFileSync('../talker.json', 'utf-8');
  if (!JSON.parse(data).length) return res.status(200).send([]);
  res.status(200).send(JSON.parse(data));
});