const fs = require('fs').promises;

const { NotFoundError } = require('../classes/Errors');

const getTalkerFile = () => fs.readFile('talker.json', 'utf-8').then((data) => JSON.parse(data));

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

  
  getTalkerFile()
    .then((allTalkers) => {

    })
    .catch(reject);
});

module.exports = {
  getAllTalkers,
  getTalkerById,
};
