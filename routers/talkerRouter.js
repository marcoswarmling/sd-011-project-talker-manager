const router = require('express').Router();

const { getTalkersData, setTalkersData } = require('../fileManager.js');

const {
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
} = require('../middleware/talkerMiddleware');

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

router.post(
  '/',
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  async (req, res) => {
    const newTalker = req.body;

    setTalkersData(newTalker);
    res.status(201).json(newTalker);
  },
);

module.exports = router;
