const router = require('express').Router();

const {
  getTalkersData,
  setTalkersData,
  editTalkersData,
  deleteTalkerData,
} = require('../fileManager.js');

const {
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyRate,
  verifyWatchedAt,
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
  verifyRate,
  verifyWatchedAt,

  async (req, res) => {
    const newTalker = req.body;

    const data = await setTalkersData(newTalker);
    res.status(201).json(data);
  },
);

router.put(
  '/:id',
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyRate,
  verifyWatchedAt,

async (req, res) => {
  const { id } = req.params;
  const newData = await editTalkersData(id, req.body);
  res.status(200).json(newData);
  },
);

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalkerData(id);
  
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
