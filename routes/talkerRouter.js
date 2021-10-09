const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(__dirname, '../', 'talker.json');
const HTTP_OK_STATUS = 200;
const BAD_RESQUEST_STATUS = 400;

router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    const talkers = JSON.parse(data);
    res.status(HTTP_OK_STATUS).json(talkers);
  } catch (err) {
    res.status(BAD_RESQUEST_STATUS).json({ message: err.message });
  }
});

module.exports = router;