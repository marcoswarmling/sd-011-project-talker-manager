const fs = require('fs').promises; 

async function getTalkers() {
  const data = await fs.readFile('./talker.json');
  const dbTalkers = JSON.parse(data);
  return dbTalkers; 
}

module.exports = {
  getTalkers,
};
