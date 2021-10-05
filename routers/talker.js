const router = require('express').Router();
const {
    readContentFile,
  // writeContentFile,
} = require('../helpers/readWriteFile');
// const validations = require('../middlewares/validations');

router.get('/', async (_req, res) => {
    const talkers = await readContentFile('./talker.json') || [];

    res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile('./talker.json');
  const findTalker = talkers.find((people) => people.id === parseInt(id, 10));

    if (!findTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}

    res.status(200).json(findTalker);
});

module.exports = router;