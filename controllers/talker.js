const fs = require('fs/promises');

const getTalkerFile = () => fs.readFile('talker.json', 'utf-8').then((data) => JSON.parse(data));

const getAllTalkers = () => getTalkerFile();

module.exports = {
  getAllTalkers,
};
