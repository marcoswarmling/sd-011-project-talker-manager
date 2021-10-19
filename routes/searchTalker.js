// Requisito 7 pt2
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const {
  tokenIsValid,
} = require('../midlewares/validateOtherTalker');

router.get('/search', tokenIsValid, async (req, res) => {
  const { query } = req.query;
  const content = await fs.readFile('./talker.json', 'utf-8');
  const talkList = JSON.parse(content);

  const filtered = talkList.filter((t) => t === t.name.includes(query));

  if (query === 0 || !query) return res.status(200).json(talkList);
  if (!filtered) return res.status(200).json([]);
  return res.status(200).json(filtered);
});

module.exports = router;