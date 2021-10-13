const router = require('express').Router();

const { getTalkersData } = require('../fileManager.js');

router.get('/', async (req, res) => {
  const talkers = await getTalkersData();
  res.status(200).json(talkers);
});

module.exports = router;
