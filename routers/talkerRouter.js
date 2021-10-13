const router = require('express').Router();
const fs = require('fs').promises;
const rescue = require('express-rescue');
const errorFsRead = require('../utils/errorFsRead');
const FILE = 'talker.json';

// ATENÇÃO, MAN: Cara, vc trocou node por nodemon no package.json. desfaça depois


router.get('/talker', rescue( async(req, res) => {
    const talkers = await fs.readFile(FILE);
    res.status(200).send(JSON.parse(talkers));
}),
errorFsRead);


// router.get('/', (req, res) => { // meu testador de rota
//     res.status(200).json({ message: 'frajola'});
// });


module.exports = router;
