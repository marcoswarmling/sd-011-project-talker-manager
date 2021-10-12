const fs = require('fs').promises;

function readTalker() {
  const fileData = fs.readFile('./talker.json', 'utf8')
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.log(`Erro na leitura, erro: ${err}`);
      process.exit(1);
    });
  return fileData;
}

async function addTalker(name, age, watchedAt, rate) {
  const talkers = await readTalker();
  const newTalker = {
    name,
    age,
    id: talkers.length + 1,
    talk: {
      rate,
      watchedAt,
    },
  };

  fs.writeFile('./talker.json', JSON.stringify([...talkers, newTalker]))
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.error(`Erro ao escrever o arquivo: ${err.message}`);
    });

  return newTalker;
}

async function updateTalker(id, newTalker) {
  const talkers = await readTalker();
  const findTalker = talkers.find((t) => t.id === id);

  talkers.splice(talkers.indexOf(findTalker), 1, newTalker);

  fs.writeFile('./talker.json', JSON.stringify(talkers))
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.error(`Erro ao escrever o arquivo: ${err.message}`);
    });
}

async function deleteTalker(id) {
  const talkers = await readTalker();
  const findIndexTalker = talkers.indexOf(id);

  talkers.splice(findIndexTalker, 1);

  fs.writeFile('./talker.json', JSON.stringify(talkers))
    .then((data) => JSON.parse(data.splice(findIndexTalker, 1)))
    .catch((err) => {
      console.error(`Erro ao escrever o arquivo: ${err.message}`);
    });
}

async function getByQuery(query) {
  const talkers = await readTalker();
  const regex = new RegExp(`.*${query}.*`, 'i');
  const findTalker = talkers.filter(({ name }) => regex.test(name));

  if (!query) return talkers;
  if (!findTalker) return [];

  return findTalker;
}

const crypto = require('crypto');

function tokenGenerator() {
  const result = crypto.randomBytes(8);
  const gottenToken = result.toString('hex');
  
  return gottenToken;
}

module.exports = {
  readTalker,
  addTalker,
  updateTalker,
  deleteTalker,
  getByQuery,
  tokenGenerator,
};
