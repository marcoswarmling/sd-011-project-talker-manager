const router = require('express').Router();
const fs = require('fs').promises;
const rescue = require('express-rescue');
const errorFsRead = require('../utils/errorFsRead');

const FILE = 'talker.json';

// ATENÇÃO, MAN: Cara, vc trocou node por nodemon no package.json. desfaça depois

router.get('/', rescue(async (req, res) => {
    const talkers = await fs.readFile(FILE);

    res.status(200).send(JSON.parse(talkers));
}),
errorFsRead);

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const talkers = await fs.readFile(FILE);
        const talkerParsed = JSON.parse(talkers);

        const found = talkerParsed.find((item) => item.id.toString() === id);
        
        if (!found) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(found);
    } catch (error) {
        next(error);
    }
});

// router.get('/', (req, res) => { // meu testador de rota
//     res.status(200).json({ message: 'frajola'});
// });

module.exports = router;
