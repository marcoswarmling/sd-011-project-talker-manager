// Requisito 2
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const fileContent = await fs.readFile('./talker.json');
    const talkersArray = JSON.parse(fileContent);
  
    const findTalker = talkersArray.find((talker) => talker.id === Number(id));
    
    return findTalker
    ? res.status(200).json(findTalker)
    : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = router;
