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

module.exports = router;