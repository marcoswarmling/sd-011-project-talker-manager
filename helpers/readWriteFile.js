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
  const newTalker = { id: content.length + 1, ...talker };
  content.push(newTalker);
  await fs.writeFile(path, JSON.stringify(content));
  return newTalker;
};

const editContentFile = async (path, id, talker) => {
  const oldContent = await readContentFile(path) || [];
  const editedTalker = { id: Number(id), ...talker };
  const newContent = oldContent.map((item) => (item.id !== Number(id) ? item : editedTalker));
  await fs.writeFile(path, JSON.stringify(newContent));
  return editedTalker;
};

const removeContentFile = async (path, id) => {
  const oldContent = await readContentFile(path) || [];
  const newContent = oldContent.filter((item) => item.id !== Number(id));
  await fs.writeFile(path, JSON.stringify(newContent));
};

module.exports = {
  readContentFile,
  writeContentFile,
  editContentFile,
  removeContentFile,
};
