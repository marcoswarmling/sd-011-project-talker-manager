const router = require('express').Router();

const fs = require('fs');

router.get('/talker', (req, res) => {
  const talkers = fs.readFileSync('./talker.json', 'utf-8');
  res.status(200).json(JSON.parse(talkers));
});

router.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkers = fs.readFileSync('./talker.json', 'utf-8');
  const speakerFiltered = JSON.parse(talkers).find((speaker) => speaker.id === Number(id));
  if (!speakerFiltered) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(speakerFiltered);
});

module.exports = router;
