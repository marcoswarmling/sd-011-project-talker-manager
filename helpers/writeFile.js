const fs = require('fs');
const { readContentTalker } = require('./readFile');

const writeContentFile = async (path, contentTalker) => {
  try {
    const arrayContent = await readContentTalker(path);
    arrayContent.push(contentTalker);
    await fs.writeFile(path, JSON.stringify(arrayContent));
    return contentTalker;
    } catch (error) {
    return null;
  }
};

module.exports = writeContentFile;