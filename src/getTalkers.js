const fs = require('fs');

function read() {
    const fileContent = fs.readFileSync('./talker.json', 'utf-8');
    return JSON.parse(fileContent);
}

module.exports = { read };