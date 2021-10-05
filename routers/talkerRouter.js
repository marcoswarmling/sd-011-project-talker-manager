const router = require('express').Router();
const rescue = require('express-rescue');
const { auth } = require('../middlewares/auth.js');
const { getTalkers, setTalkers } = require('../fs-utils');

router.get('/', rescue(async (req, res) => {
  const talkers = await getTalkers();
  if (talkers.length === 0) return res.status(200).send([]);
  
  return res.status(200).json(talkers);
}));

module.exports = router;