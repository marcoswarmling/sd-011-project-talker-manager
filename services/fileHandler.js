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

module.exports = {
  readContent,
  writeContent,
};
