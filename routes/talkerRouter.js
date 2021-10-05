// Requisito 1
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

// req não precisará ser usado aqui.
router.get('/', async (_req, res) => {
  try {
    const fileContent = await fs.readFile('./talker.json');
    const talkersArray = JSON.parse(fileContent);
    
    return res.status(200).json(talkersArray);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = router;
