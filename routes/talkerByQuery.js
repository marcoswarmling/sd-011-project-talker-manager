// Requisito 7
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const {
  verifyTokenIsValid,
} = require('../middlewares/validateNewTalker');

router.get('/search', verifyTokenIsValid, async (req, res) => {
  const { query } = req.query;
  const array = await fs.readFile('./talker.json', 'utf-8');
  const talkersList = JSON.parse(array);

  const listFilteredByQuery = talkersList.filter((t) => t === t.name.includes(query));
  
  if (query === 0 || !query) return res.status(200).json(talkersList);
  if (!listFilteredByQuery) return res.status(200).json([]);
  return res.status(200).json(listFilteredByQuery);
});

module.exports = router;
