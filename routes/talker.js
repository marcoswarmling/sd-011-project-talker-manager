// importa o router
const router = require('express').Router();
const talksController = require('../controllers/talksControllers');

router.get('/', talksController.getAllTalks);

router.get('/:id', talksController.getIdTalks);

const {
    // readContent,
    writeContent, 
  } = require('../services/services');
  
  const {
    checkToken,
    checkName,
    checkAge,
    checkTalk,
    checkDate,
    checkRate,
  } = require('../services/services');

router.use(
    checkToken,
    checkName,
    checkAge,
    checkTalk,
    checkDate,
    checkRate,
  );

  const talkerDB = './talker.json';
  router.post('/', async (req, res) => {
    const newEntry = await writeContent(talkerDB, req.body);
    return res
      .status(201)
      .json(newEntry);
  });

module.exports = router;