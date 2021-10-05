const router = require('express').Router();

const { readTalkerFile } = require('../helper');

router.get('/', async (_req, res) => {
  readTalkerFile()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(({ message }) => res.status(500).json({ message }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  readTalkerFile()
    .then((data) => {
      const talker = data.find((t) => Number(t.id) === Number(id));
      if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      res.status(200).json(talker);
    })
    .catch(({ message }) => res.status(500).json({ message }));
});

module.exports = router;
