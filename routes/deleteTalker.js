const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf8').then((data) => JSON.parse(data));
const writeTalker = (newFile) => fs.writeFile('./talker.json', JSON.stringify(newFile));

const delTalker = async (req, res) => {
  const { id } = req.params;
  const db = await readFile();
  const talkerFound = db.find((t) => t.id === +id);
  await writeTalker(talkerFound);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = { delTalker };