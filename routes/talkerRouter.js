const router = require('express').Router();

const talkersJson = require('../helper/fs');

router.get('/', async (req, res) => {
  const data = await talkersJson();
  res.status(200).json(data);
});

module.exports = router;