const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', async (_req, res) => {
  fs.readFile('./talker.json')
    .then((rawData) => JSON.parse(rawData))
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json(err.message));
});

module.exports = router;
