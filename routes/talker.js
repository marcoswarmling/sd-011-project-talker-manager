// importa o router
const router = require('express').Router();
const routerCheck = require('express').Router();

const talksController = require('../controllers/talksControllers');

const talkerDB = './talker.json';
const {
    // readContent,
    writeContent, 
    updateContent,
    deleteContent,
    searchContent,
  } = require('../services/services');

  const {
    checkToken,
    checkName,
    checkAge,
    checkTalk,
    checkDate,
    checkRate,
  } = require('../services/services');
//   req 7
routerCheck.use(checkToken);
router.get('/search', checkToken, async (req, res) => {
    const { q } = req.query;
    console.log(q);
    const results = await searchContent(talkerDB, q);
    return res.status(200).json(results);
    });

router.get('/', talksController.getAllTalks);

router.get('/:id', talksController.getIdTalks);
//   req 6
router.use(checkToken);
router.delete('/:id', checkToken, async (req, res) => {
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

//   req 5
    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const updatedEntry = await updateContent(talkerDB, req.body, id);
        return res.status(200).json(updatedEntry);
        });
   
module.exports = router;