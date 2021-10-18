const router = require('express').Router();
const fs = require('fs');

const talkersList = './talker.json';

router.get('/', (_req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync(talkersList));
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const talkers = JSON.parse(fs.readFileSync(talkersList));
    const talker = talkers.find((tk) => tk.id === Number(id));

    return talker
      ? res.status(200).json(talker)
      : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;