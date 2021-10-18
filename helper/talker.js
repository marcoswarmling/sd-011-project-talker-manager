const fs = require('fs');

const talker = () => JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

module.exports = talker;
