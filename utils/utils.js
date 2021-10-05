const fs = require('fs').promises;
const crypto = require('crypto');

const readFileContent = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
};

const writeFileContent = async (path, newTalker) => {
  try {
    const currentContent = await readFileContent(path);
    const newTalkerWithId = { ...newTalker, id: currentContent.length + 1 };
    currentContent.push(newTalkerWithId);
    await fs.writeFile(path, JSON.stringify(currentContent));
    return newTalkerWithId;
  } catch (err) {
    return null;
  }
};

const getTalkerById = async (id) => {
  try {
    const talkers = await readFileContent('./talker.json');
    const talkerById = talkers.find((talker) => talker.id === Number(id));
  
    return talkerById;
  } catch (err) {
    return null;
  }
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

module.exports = { 
  readFileContent, 
  getTalkerById, 
  generateToken, 
  writeFileContent,
};
