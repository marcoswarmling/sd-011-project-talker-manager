const fs = require('fs').promises;

async function readTalkerJson() {
  const fileData = await fs.readFile('../talker.json', 'utf8');
  return fileData;
}

const registerTalker = async (req, res, _next) => {
  const { id } = req.params;
  const idInt = Number(id);
  const fileData = await readTalkerJson();
  const data = JSON.parse(fileData);
  const { name, talk, age } = req.body;
  const talkerIndex = data.findIndex((tal) => tal.id === parseInt(id, 10));
  data[talkerIndex] = { id: idInt, name, age, talk };
  fs.writeFile('../talker.json', JSON.stringify(data));
  return res.status(200).json(data[talkerIndex]);
};

module.exports = registerTalker;
