const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const { validateTokenAuthorization } = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateRate = require('../middlewares/validateRate');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateTalkInfos = require('../middlewares/validateTalkInfos');

const DATA_PATH = path.join(__dirname, '../', 'talker.json');
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
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

router.post('/',
  validateTokenAuthorization,
  validateName,
  validateAge,
  validateTalkInfos,
  validateRate,
  validateWatchedAt,
  (req, res) => {
  const { name, age, talk } = req.body;
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    const talkers = JSON.parse(data);
    const NEXT_ID = talkers.length + 1;
    const newTalker = {
      name,
      age,
      id: NEXT_ID,
      talk,
    };
    const updatedTalkers = [...talkers, newTalker];
    fs.writeFileSync(DATA_PATH, JSON.stringify(updatedTalkers));
    console.log('newTalker', newTalker, 'upadate', updatedTalkers);
    return res.status(HTTP_CREATED_STATUS).json(newTalker);
  } catch (err) {
    return res.status(BAD_RESQUEST_STATUS).json({ message: err.message });
  }
});

router.put('/:id', validateTokenAuthorization,
validateName,
validateAge,
validateTalkInfos,
validateRate,
validateWatchedAt, (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = JSON.parse((fs.readFileSync(DATA_PATH, 'utf8')));
    const talker = data.find((t) => t.id === Number(id));
    const uptadedTalkerInfo = {
      name,
      age,
      id: talker.id,
      talk,
    };

    data[`${talker.id}`] = uptadedTalkerInfo; 
    fs.writeFileSync(DATA_PATH, JSON.stringify(data));
    return res.status(HTTP_OK_STATUS).json(uptadedTalkerInfo);
  } catch (err) {
    return res.status(BAD_RESQUEST_STATUS).json({ message: err.message });
  }
});

module.exports = router;