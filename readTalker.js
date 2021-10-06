const fs = require('fs');

const getTalkers = () => JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

module.exports = { getTalkers };