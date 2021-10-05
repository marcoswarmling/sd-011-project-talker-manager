const fs = require('fs').promises;

const readContentFile = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
};

const writeContentFile = async (path, talker) => {
  const content = await readContentFile(path) || [];
  const newTalker = { ...talker, id: content.length + 1 };
  content.push(newTalker);
  await fs.writeFile(path, JSON.stringify(content));
  return newTalker;
};

const removeContentFile = async (path, id) => {
  const oldContent = await readContentFile(path) || [];
  const newContent = oldContent.filter((item) => item.id !== Number(id));
  await fs.writeFile(path, JSON.stringify(newContent));
};

module.exports = { readContentFile, writeContentFile, removeContentFile };
