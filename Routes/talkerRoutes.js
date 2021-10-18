const router = require('express').Router();
const fs = require('fs');

const talkersList = './talker.json';
const UTF = 'utf-8';

router.get('/', (_req, res) => {
  try {
    const talkers = fs.readFileSync(talkersList, UTF);
    return res.status(200).json(JSON.parse(talkers));
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;