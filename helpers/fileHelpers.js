const fs = require('fs').promises;

async function readAllTalkers(path) {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

module.exports = readAllTalkers;