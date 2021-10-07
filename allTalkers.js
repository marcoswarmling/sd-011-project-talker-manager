const fs = require('fs');

function getTalkers() {
  const talkers = JSON
    .parse(fs.readFileSync('./talker.json', 'utf-8'));
  return talkers;
}
module.exports = {
  getTalkers,
};
