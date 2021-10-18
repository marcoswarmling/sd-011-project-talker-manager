const express = require('express');
const Talker = require('../middlewares/talkersMiddlewares');

const router = express.Router();

const rescue = require('express-rescue');
const fsUtils = require('../middlewares/utils');
const { isValidToken } = require('../middlewares/fs');
  
  router.get('/search', isValidToken, rescue(async (req, res) => {
    const { q } = req.query;
    const talkers = await fsUtils.getTalker();
  
    if (!q || q === '') return res.status(200).json(talkers);
  
    const talker = talkers.filter((t) => t.name.includes(q));
  
    if (!talker) return res.status(200).json([]);
  
    return res.status(200).json(talker);
  }));

router.get('/', Talker.getAllTalkers);
router.get('/:talkerId', Talker.getTalkerById);

module.exports = router;