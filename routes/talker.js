const router = require('express').Router();
const fs = require('fs/promises');

const talkers = './talker.json';

const { validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateTalkKeys } = require('../middlewares/talker.js');

    // const generateToken = () => {
    //     const token = crypto.randomBytes(8).toString('hex');
    //     return token;
    //   };

router.get('/', async (_req, res) => {
    const json = await fs.readFile(talkers);
    const results = JSON.parse(json);
     return res.status(200).json(results);
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const data = fs.readFileSync(talkers);
    const results = JSON.parse(data);
    const Matchid = results.find((result) => result.id === Number(id));
    if (!Matchid) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(Matchid);
});

router
.post('/', validateToken, validateName, validateAge, validateTalk, validateTalkKeys,
async (req, res) => {
    try {
        const { name, age, talk } = req.body;
        const data = await fs.readFile(talkers);
        const results = JSON.parse(data);
        const newTalker = { name, age, talk: { ...talk }, id: results.length + 1 };
        results.push(newTalker);
         fs.writeFile(talkers, JSON.stringify(results));
        res.status(201).json(newTalker);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;
