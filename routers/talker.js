const router = require('express').Router();
const {
    readContentFile,
  // writeContentFile,
} = require('../helpers/readWriteFile');
// const validations = require('../middlewares/validations');

router.get('/', async (_req, res) => {
    const talkers = await readContentFile('./talker.json') || [];

    res.status(200).json(talkers);
});

module.exports = router;