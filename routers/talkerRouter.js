const router = require('express').Router();

const { getTalkersData } = require('../fileManager.js');

router.get('/', async (req, res) => {
  const talkers = await getTalkersData();
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const talkers = await getTalkersData();
  const { id } = req.params;

  const filteredTalker = talkers.find((talker) => talker.id === parseInt(id, 0));

  if (!filteredTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada', 
    });
}
  res.status(200).json(filteredTalker);
});

module.exports = router;
