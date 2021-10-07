const fs = require('fs').promises;

const { readContentFile } = require('./readFile');

const writeContentFile = async (path, content) => {
  try {
    const arrContent = await readContentFile(path);

    arrContent.push(content);
    await fs.writeFile(path, JSON.stringify(arrContent));

    return content;
  } catch (error) {
    return null;
  }
};

module.exports = {
  writeContentFile,
};
