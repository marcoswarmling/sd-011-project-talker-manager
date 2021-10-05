const router = require('express').Router();
const {
  getTalker,
  getTalkerId,
} = require('../middleware/validation');

router.get('/talker', getTalker);
router.get('/talker/:id', getTalkerId);

module.exports = router;
