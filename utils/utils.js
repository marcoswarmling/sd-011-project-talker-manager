const fs = require('fs').promises;
const crypto = require('crypto');

const PATH = './talker.json';

const readFileContent = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
};

const updateFileContent = async (path, talkers) => {
  try {
    await fs.writeFile(path, JSON.stringify(talkers));
    return talkers;
  } catch (err) {
    return null;
  }
};

const writeFileContent = async (path, newTalker) => {
  try {
    const currentContent = await readFileContent(path);
    currentContent.push(newTalker);
    await fs.writeFile(path, JSON.stringify(currentContent));
    return newTalker;
  } catch (err) {
    return null;
  }
};

const getTalkerById = async (id) => {
  try {
    const talkers = await readFileContent(PATH);
    const talkerById = talkers.find((talker) => talker.id === Number(id));
  
    return talkerById;
  } catch (err) {
    return null;
  }
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

const editTalker = async (id, editTalkerInfo) => {
  try {
    const { name, age, talk } = editTalkerInfo;
    const talkers = await readFileContent(PATH);
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
    const idToNumber = Number(id);
    talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk, id: idToNumber };
    await updateFileContent(PATH, talkers);
    return talkers[talkerIndex];
  } catch (err) {
    return null;
  }
};

const deleteTalker = async (id) => {
  try {
    const talkers = await readFileContent('./talker.json');
    const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
    await fs.writeFile('./talker.json', JSON.stringify(newTalkers));
    return newTalkers;
  } catch (err) {
    return null;
  }
};

module.exports = { 
  readFileContent, 
  getTalkerById, 
  generateToken, 
  writeFileContent,
  deleteTalker,
  editTalker,
};
