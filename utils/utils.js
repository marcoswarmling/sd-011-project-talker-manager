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
    // const newTalkerWithId = { ...newTalker, id: currentContent.length + 1 };
    currentContent.push(newTalker);
    await fs.writeFile(path, JSON.stringify(currentContent));
    return newTalker;
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

// const editTalker = async (id, editTalkerInfo) => {
//   try {
//     console.log('id', id);
//     console.log('editinfo', editTalkerInfo);
//     const talkers = await readFileContent('./talker.json');
//     console.log('talkers', talkers);
//     const editedTalkers = talkers.filter((talker) => {
//       if (talker.id === id) {
//         return { editTalkerInfo };
//       }
//       return talker;
//     });
//     console.log(editedTalkers);
//     await writeFileContent('.talker.json', editedTalkers);
//     return editTalkerInfo;
//   } catch (err) {
//     return null;
//   }
// };

const deleteTalker = async (id) => {
  try {
    const talkers = await readFileContent('./talker.json');
    console.log('talkers', talkers);
    const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
    console.log(newTalkers);
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
  // editTalker,
};
