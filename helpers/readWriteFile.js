const fs = require('fs').promises;

const readContentFile = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
};

const writeContentFile = async (path, newItem) => {
  const content = await readContentFile(path) || [];
  content.push(newItem);
  await fs.writeFile(path, JSON.stringify(content));
};

const removeContentFile = async (path, id) => {
  const oldContent = await readContentFile(path) || [];
  const newContent = oldContent.filter((item) => item.id !== Number(id));
  await fs.writeFile(path, JSON.stringify(newContent));
};

module.exports = { readContentFile, writeContentFile, removeContentFile };
