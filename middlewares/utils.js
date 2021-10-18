/* const fs = require('fs').promises;

const file = './talker.json';

const getTalker = () => fs.readFile(file, 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));

const setTalker = (talkers) => fs.writeFile(file, JSON.stringify(talkers));

module.exports = { getTalker, setTalker }; */