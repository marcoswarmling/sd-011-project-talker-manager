const fs = require('fs');
const { readContentTalker } = require('./readFile');

const writeContentTalker = async (newData) => { 
  try {
    const dataTalker = await readContentTalker();
    const newDataTalker = { id: dataTalker.length + 1, ...newData };
    
    dataTalker.push(newDataTalker);
    
    await fs.writeFileSync('./talker.json', JSON.stringify(dataTalker));
    return newDataTalker;
    } catch (error) {
    return null;
  }
};

module.exports = writeContentTalker;