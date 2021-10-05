const fs = require('fs');

function read() {
    const fileContent = fs.readFileSync('./talker.json', 'utf-8');
    return JSON.parse(fileContent);
}

function findId(id) {
    return read().find((talker) => talker.id === +id);
}

module.exports = { read, findId };