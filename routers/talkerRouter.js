const router = require('express').Router();
const fs = require('fs');

router.get('/', async (_req, res) => {
  try {
    const data = fs.readFileSync('./talker.json', 'utf-8');
    const talkers = JSON.parse(data);
  
    res.status(200).json({ talkers });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;