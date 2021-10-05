const fs = require('fs').promises;

const { NotFoundError } = require('../classes/Errors');

const addTalkerSchema = require('../validators/schemas/addTalker.json');
const { validate } = require('../validators');

const getTalkerFile = () => fs.readFile('talker.json', 'utf-8').then((data) => JSON.parse(data));

const saveTalkerFile = (data) => fs.writeFile('talker.json', JSON.stringify(data, null, '\t'));

const getAllTalkers = () => getTalkerFile();

const getTalkerById = (id) => new Promise((resolve, reject) => {
  getTalkerFile()
    .then((allTalkers) => {
      const foundTalker = allTalkers.find((talker) => talker.id === parseInt(id, 10));
      if (!foundTalker) {
        throw new NotFoundError('Pessoa palestrante não encontrada');
      }

      resolve(foundTalker);
    })
    .catch(reject);
});

const addTalker = (details) => new Promise((resolve, reject) => {
  try {
    validate(addTalkerSchema, details);
  } catch (err) {
    return reject(err);
  }

  getTalkerFile()
    .then((allTalkers) => {
      const lastId = allTalkers[allTalkers.length - 1].id;
      const newTalker = { id: lastId + 1, ...details };
      allTalkers.push(newTalker);

      return Promise.all([Promise.resolve(newTalker, saveTalkerFile(allTalkers))]);
    })
    .then(([newTalker]) => {
      resolve(newTalker);
    })
    .catch(reject);
});

module.exports = {
  getAllTalkers,
  getTalkerById,
  addTalker,
};
