const router = require('express').Router();
const rescue = require('express-rescue');
const errorFsRead = require('../utils/errorFsRead');
const readFile = require('../utils/readFile');
const { writeFileFunc } = require('../utils/writeFile');

const { 
    tokenValidator, 
    nameValidator,
    ageValidator,
    talkValidator,
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
    const { name, id, age,
        talk: { rate, watchedAt } } = req.body;

    const newData = { name, id, age, talk: { rate, watchedAt } };

    readFile(FILE)
    .then((data) => JSON.parse(data))
    .then((talkers) => {
      newData.id = talkers.length + 1; // Adiciona id incrementado em 1.

      talkers.push(newData);
      writeFileFunc(FILE, talkers);
      return res.status(201).json(newData);
    })
    .catch((error) => error);

    // Outra maneira de fazer é o modo try/catch). Nesse caso não usaria o "rescue".
}));

router.delete('/:id', tokenValidator, rescue(async (req, res) => {
    const { id } = req.params;
    const foundMessage = 'Pessoa palestrante não encontrada';
    readFile(FILE)
    .then((data) => JSON.parse(data))
    .then((talkers) => {
        const updatedTalkers = talkers;
        const foundIndex = talkers.findIndex((item) => item.id.toString() === id);
        if (!foundIndex) return res.status(404).json({ message: foundMessage });
        updatedTalkers.splice(foundIndex, 1);

      writeFileFunc(FILE, updatedTalkers);
      return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    })
    .catch((error) => error);

    // Outra maneira de fazer é o modo try/catch). Nesse caso não usaria o "rescue".
}));

router.put('/:id', tokenValidator, nameValidator,
ageValidator, talkValidator, rescue(async (req, res) => {
    const { id } = req.params;
    const foundMessage = 'Pessoa palestrante não encontrada';
    readFile(FILE)
    .then((data) => JSON.parse(data))
    .then((talkers) => {
        const updatedTalkers = talkers;
        const foundIndex = talkers.findIndex((item) => item.id.toString() === id);
        if (!foundIndex) return res.status(404).json({ message: foundMessage });
        updatedTalkers[foundIndex] = { ...talkers[foundIndex], ...req.body };

      writeFileFunc(FILE, updatedTalkers);
      return res.status(200).json(updatedTalkers[foundIndex]);
    })
    .catch((error) => error);

    // Outra maneira de fazer é o modo try/catch). Nesse caso não usaria o "rescue".
}));

router.get('/:id', rescue(async (req, res, next) => {
    const { id } = req.params;

    try {
        const talkers = await readFile(FILE);
        const talkerParsed = JSON.parse(talkers);
        const found = talkerParsed.find((item) => item.id.toString() === id);
        
        if (!found) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

        res.status(200).json(found);
    } catch (error) {
        next(error);
    }
}));

module.exports = router;
