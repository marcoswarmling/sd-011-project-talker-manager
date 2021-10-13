const router = require('express').Router();
const fs = require('fs').promises;
const rescue = require('express-rescue');
const errorFsRead = require('../utils/errorFsRead');
const FILE = 'talker.json';

// ATENÇÃO, MAN: Cara, vc trocou node por nodemon no package.json. desfaça depois


router.get('/', rescue( async(req, res) => {
    const talkers = await fs.readFile(FILE);
    res.status(200).send(JSON.parse(talkers));
}),
errorFsRead);

// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     let found;

//     try {
//         const talkers = JSON.parse(await fs.readFile(FILE));
//         found = talkers.find((item) => {
//             item.id === id;
//         });
        
//         console.log(found);
//         res.status(200).json(found);
        
//     } catch (error) {
//         res.status(404).json({ message: "Pessoa palestrante não encontrada" });
//     }
    

// });


// router.get('/', (req, res) => { // meu testador de rota
//     res.status(200).json({ message: 'frajola'});
// });


module.exports = router;
