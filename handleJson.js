const fs = require('fs').promises;

const readFile = async () => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(file);
};

const writeFile = async (content) => {
  const file = await readFile();
  const newArray = [...file, content];
  await fs.writeFile('./talker.json', JSON.stringify(newArray));
};

const editTalker = async (reqId, obj) => {
  const file = await readFile();
  const index = file.findIndex((el) => el.id === Number(reqId));
  file[index] = { ...file[index], ...obj };
  file.sort((a, b) => a.id - b.id);
  await fs.writeFile('./talker.json', JSON.stringify(file));
  return file[index];
};

const deleteTalker = async (id) => {
  const file = await readFile();
  const filtered = file.filter((el) => el.id !== Number(id));
  await fs.writeFile('./talker.json', JSON.stringify(filtered));
};

module.exports = {
  readFile,
  writeFile,
  editTalker,
  deleteTalker,
};