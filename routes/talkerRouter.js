const router = require('express').Router();
const path = require('path');
const fs = require('fs');

// const { validateTokenAuthorization } = require('../middlewares/validateToken');

const DATA_PATH = path.join(__dirname, '../', 'talker.json');
const HTTP_OK_STATUS = 200;
const BAD_RESQUEST_STATUS = 400;
const NOT_FOUND_STATUS = 404;

router.get('/', (_req, res) => {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    const talkers = JSON.parse(data);
    res.status(HTTP_OK_STATUS).json(talkers);
  } catch (err) {
    res.status(BAD_RESQUEST_STATUS).json({ message: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    const talkers = JSON.parse(data);
    const foundedTalker = talkers.find((t) => t.id === Number(id));
    if (!foundedTalker) {
      return res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).send(foundedTalker);
  } catch (err) {
    res.status(BAD_RESQUEST_STATUS).send({ message: err.message });
  }
});

module.exports = router;