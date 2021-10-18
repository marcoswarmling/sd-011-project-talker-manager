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
} = require('../middlewares/talkerMiddlewares');

router.get('/', getAllTalkers);
router.get('/:id', getTalkerById);

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

module.exports = router;