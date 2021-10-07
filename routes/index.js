const router = require('express').Router();

const fs = require('fs');

router.get('/talker', (req, res) => {
  const talker = fs.readFileSync('./talker.json', 'utf-8');

  res.status(200).json(JSON.parse(talker));
});

router.get('/talker/:id', (req, res) => {
    const { id } = req.params;
    const talkers = fs.readFileSync('./talker.json', 'utf-8');
    const talkerId = JSON.parse(talkers).find((t) => t.id === Number(id));
    if (!talkerId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkerId);
  });

module.exports = router;