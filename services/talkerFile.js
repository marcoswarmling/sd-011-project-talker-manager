const fs = require('fs').promises;

const readJson = async (talkersJson) => {
  try {
  const talkerJson = await fs.readFile(talkersJson, 'utf-8');
  return JSON.parse(talkerJson);
} catch (error) {
  return error;
}
};
module.exports = {
  readJson,
};