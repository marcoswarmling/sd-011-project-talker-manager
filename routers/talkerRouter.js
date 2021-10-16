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

router.get('/search', tokenValidator, rescue(async (req, res) => {
    const { searchTerm } = req.query;
    let foundSearch = [];    
    readFile(FILE)
    .then((data) => JSON.parse(data))
    .then((talkers) => {
        if (!searchTerm) return res.status(200).send(talkers);
        if (searchTerm) {
            foundSearch = talkers.filter((item) => item.name.includes(searchTerm));
        }

      return res.status(200).send(foundSearch);
    })
    .catch((error) => error);

    // Outra maneira de fazer é o modo try/catch). Nesse caso não usaria o "rescue".
}));

router.get('/', rescue(async (req, res) => {
    const talkers = await readFile(FILE);

    res.status(200).send(JSON.parse(talkers));
}),
errorFsRead);

router.post('/', tokenValidator, nameValidator,
ageValidator, talkValidator, rescue((req, res) => {
    const { name, id, age,
        talk: { rate, watchedAt } } = req.body;

    const newData = { name, id, age, talk: { rate, watchedAt } };

    readFile(FILE)
    .then((data) => JSON.parse(data))
    .then(async (talkers) => {
      newData.id = talkers.length + 1; // Adiciona id incrementado em 1.

      talkers.push(newData);
      await writeFileFunc(FILE, talkers);
      return res.status(201).json(newData);
    })
    .catch((error) => error);

    // Outra maneira de fazer é o modo try/catch). Nesse caso não usaria o "rescue".
}));

router.delete('/:id', tokenValidator, rescue((req, res) => {
    const { id } = req.params;
    const foundMessage = 'Pessoa palestrante não encontrada';
    readFile(FILE)
    .then((data) => JSON.parse(data))
    .then(async (talkers) => {
        const updatedTalkers = talkers;
        const foundIndex = talkers.findIndex((item) => item.id.toString() === id);
        if (!foundIndex) return res.status(404).json({ message: foundMessage });
        updatedTalkers.splice(foundIndex, 1);

      await writeFileFunc(FILE, updatedTalkers);
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
    .then(async (talkers) => {
        const updatedTalkers = talkers;
        const foundIndex = talkers.findIndex((item) => item.id.toString() === id);
        if (!foundIndex) return res.status(404).json({ message: foundMessage });
        updatedTalkers[foundIndex] = { ...talkers[foundIndex], ...req.body };

      await writeFileFunc(FILE, updatedTalkers);
      return res.status(200).json(updatedTalkers[foundIndex]);
    })
    .catch((error) => error);

    // Outra maneira de fazer é o modo try/catch). Nesse caso não usaria o "rescue".
}));

router.get('/:id', async (req, res, next) => {
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
});

module.exports = router;
