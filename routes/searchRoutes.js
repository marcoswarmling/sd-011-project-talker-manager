/* const router = require('express').Router();
const rescue = require('express-rescue');
const fsUtils = require('../middlewares/utils');
const { isValidToken } = require('../middlewares/fs');

  router.get('/', rescue(async (_req, res) => {
    const talkers = await fsUtils.getTalker();
    if (!talkers) {
      return res.status(200).json(talkers);
    } 
    return res.status(200).json(talkers);
  }));
  
  router.get('/search', isValidToken, rescue(async (req, res) => {
    const { q } = req.query;
    const talkers = await fsUtils.getTalker();
  
    if (!q || q === '') return res.status(200).json(talkers);
  
    const talker = talkers.filter((t) => t.name.includes(q));
  
    if (!talker) return res.status(200).json([]);
  
    return res.status(200).json(talker);
  }));

  module.exports = router; */