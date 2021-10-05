const fs = require('fs').promises;

async function readTalker(path) {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

async function writeTalker(path, content) {
  try {
    await fs.writeFile(path, JSON.stringify(content));

    return content;
  } catch (error) {
    return null;    
  }
}

module.exports = {
  readTalker,
  writeTalker,
};