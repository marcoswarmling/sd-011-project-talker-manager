const { readFile } = require('./handleJson');

const getLastId = async () => {
  const file = await readFile();
  if (file.length === 0) return 1;
  const id = file[file.length - 1].id + 1;
  return id;
};

module.exports = getLastId;