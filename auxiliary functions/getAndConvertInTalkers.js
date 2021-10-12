const fs = require('fs').promises; 

async function getTalkers() {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const dbTalkers = JSON.parse(data);
  return dbTalkers; 
}

function setTalkers(newTalk) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalk));
}

module.exports = {
  getTalkers,
  setTalkers,
};
