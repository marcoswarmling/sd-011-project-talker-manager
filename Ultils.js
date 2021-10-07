const fs = require('fs');

function getTalkers() {
  fs.readFileSync('./talker.json', 'utf8')
    .then((contentFile) => JSON.parse(contentFile));
}
                       
module.exports = getTalkers;
