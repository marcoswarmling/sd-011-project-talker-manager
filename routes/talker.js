// importa o router
const router = require('express').Router();
const talksController = require('../controllers/talksControllers');

router.get('/', talksController.getAllTalks);

router.get('/:id', talksController.getIdTalks);

const talkerDB = './talker.json';
const {
    // readContent,
    writeContent, 
    updateContent,
    deleteContent,
  } = require('../services/services');
  
  const {
    checkToken,
    checkName,
    checkAge,
    checkTalk,
    checkDate,
    checkRate,
  } = require('../services/services');

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedEntry = await updateContent(talkerDB, req.body, id);
  return res.status(200).json(updatedEntry);
  });

  //   req 6
router.use(checkToken);
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  deleteContent(talkerDB, id);
  console.log(id);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.use(
    checkToken,
    checkName,
    checkAge,
    checkTalk,
    checkDate,
    checkRate,
  );

  router.post('/', async (req, res) => {
    const newEntry = await writeContent(talkerDB, req.body);
    return res.status(201).json(newEntry);
});

module.exports = router;