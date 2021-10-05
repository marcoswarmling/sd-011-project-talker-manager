const fs = require('fs');

const getTalkers = () => JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

const setTalker = (newTalker) => JSON.parse(
  fs.writeFileSync('./talker.json'), JSON.stringify(newTalker),
);

module.exports = { getTalkers, setTalker };