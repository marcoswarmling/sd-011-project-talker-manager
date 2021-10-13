const router = require('express').Router();
const rescue = require('express-rescue');
const errorFsRead = require('../utils/errorFsRead');
const readFile = require('../utils/readFile');
const { writeFileFunc } = require('../utils/writeFile');

const { 
    tokenValidator, 
    nameValidator,
    ageValidator,
    talkValidator
 } = require('../utils/validators');

const FILE = 'talker.json';

// ATENÇÃO, MAN: Cara, vc trocou node por nodemon no package.json. desfaça depois


router.get('/', rescue(async (req, res) => {
    const talkers = await readFile(FILE);

    res.status(200).send(JSON.parse(talkers));
}),
errorFsRead);


router.post('/', tokenValidator, nameValidator,
ageValidator, talkValidator, rescue(async (req, res) => {

    const { 
        name, id, age,
        talk: { rate, watchedAt} 
     } = req.body;

    let newData =  { 
        name, id, age,
        talk: { rate, watchedAt} 
     };



    readFile(FILE)
    .then((data) => JSON.parse(data))
    .then((talkers) => {

      newData.id = talkers.length + 1; // Adiciona id incrementado em 1.

      talkers.push(newData);
      writeFileFunc(FILE, talkers);
      return res.status(201).json(newData);

    })
    .catch((error) => error);


    // Comentado outra maneira de fazer (modo try/catch). 
    // Nesse caso não usaria o "rescue".

    // try {

    //   const talkers = JSON.parse(await readFile(FILE));
    //   talkers.push(newData);
    //   await writeFileFunc(FILE, talkers);
    //   return res.status(201).send(newData);
    
    // } catch (error) {
    //     return error;
    // }


}));


router.get('/:id', rescue(async (req, res, next) => {
    const { id } = req.params;

    // Comentado outra maneira de fazer (modo try/catch). 
    // Nesse caso não usaria o "rescue".

    // try {
    //     const talkers = await readFile(FILE);
    //     const talkerParsed = JSON.parse(talkers);
    //     const found = talkerParsed.find((item) => item.id.toString() === id);
        
    //     if (!found) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    //     res.status(200).json(found);

    // } catch (error) {
    //     next(error);
    // }

    const talkers = await readFile(FILE);
    const talkerParsed = JSON.parse(talkers);
    const found = talkerParsed.find((item) => item.id.toString() === id);
    
    if (!found) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    res.status(200).json(found);
  
}));

module.exports = router;
