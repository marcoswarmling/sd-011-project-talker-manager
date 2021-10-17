const router = require('express').Router();
const {
  getAllTalkers,
  getTalkerById,
} = require('../middlewares/talkerMiddlewares');

router.get('/', getAllTalkers);
router.get('/:id', getTalkerById);

module.exports = router;