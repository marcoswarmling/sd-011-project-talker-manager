const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf8').then((data) => JSON.parse(data));
const writeTalker = (newFile) => fs.writeFile('./talker.json', JSON.stringify(newFile));

const updateTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const db = await readFile();
  const talkerFilter = db.filter((t) => t.id === +id);
  const newTalker = {
    name,
    age,
    id: +id,
    talk,
  };
  talkerFilter.push(newTalker);
  await writeTalker(talkerFilter);
  return res.status(200).json(newTalker);
};

module.exports = { updateTalker };