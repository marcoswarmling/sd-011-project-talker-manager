const fs = require('fs').promises;

const readFileContent = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf-8');
    console.log(content)
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
};

module.exports = { readFileContent };