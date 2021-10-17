const fs = require('fs').promises;

const readContent = async (file) => {
  try {
    const content = await fs.readFile(file, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

const writeContent = async (file, content) => {
  try {
    const db = await readContent(file) || [];
    const id = db.length + 1;
    const newEntry = { id, ...content };
    db.push(newEntry);
    await fs.writeFile(file, JSON.stringify(db));
    return newEntry;
  } catch (error) {
    return null;
  }
};

const updateContent = async (file, content, id) => {
  const db = await readContent(file);
  const newEntry = { id: Number(id), ...content };
  const newdb = db.map((talker) => (talker.id === newEntry.id ? newEntry : talker));
  await fs.writeFile(file, JSON.stringify(newdb));
  return newEntry;
};

const deleteContent = async (file, id) => {
  const db = await readContent(file);
  const newdb = db.filter((talker) => (talker.id !== Number(id)));
  await fs.writeFile(file, JSON.stringify(newdb));
  return null;
};

module.exports = {
  readContent,
  writeContent,
  updateContent,
  deleteContent,
};
