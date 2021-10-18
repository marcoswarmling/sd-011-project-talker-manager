const router = require('express').Router();
const {
  getAllTalkers,
  getTalkerById,
  addTalker,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkRate,
  verifyTalkDate,
  editTalker,
  deleteTalker,
  searchTalker,
} = require('../middlewares/talkerMiddlewares');

router.get('/', getAllTalkers);

router.post(
  '/',
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkRate,
  verifyTalkDate,
  addTalker,
);

router.put(
  '/:id',
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkRate,
  verifyTalkDate,
  editTalker,
);

router.delete(
  '/:id',
  verifyToken,
  deleteTalker,
);

router.get(
  '/search',
  verifyToken,
  searchTalker,
);

router.get('/:id', getTalkerById);

module.exports = router;