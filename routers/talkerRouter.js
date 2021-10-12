const router = require('express').Router();
const fs = require('fs');
const { readContentTalker } = require('../helpers/readFile');

router.get('/talker', async (_req, res) => {
  const dataTalker = await readContentTalker('./talker.json') || [];
  res.status(200).json(dataTalker);
});

router.get('talker/:id', (req, res) => {
    const { id } = req.params;
    const dataId = fs.readFileSync('./talker.json', 'utf-8');
    const talkerId = JSON.parse(dataId);
    
    const talkers = talkerId.find((item) => item.id === Number(id));
    
    if (!talkers) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    
    res.status(200).json(talkers);
  });

  module.exports = router;