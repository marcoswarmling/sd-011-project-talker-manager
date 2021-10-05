const fs = require('fs').promises;

const readFile = async () => {
  const getDataFromFile = await fs.readFile('./talker.json', 'utf8');
  return getDataFromFile;
};

const registerTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const readData = JSON.parse(await readFile());
  readData.push({
    name,
    age,
    id: readData[readData.length - 1].id + 1,
    talk,
  });
  await fs.writeFile('./talker.json', JSON.stringify(readData));
  return res.status(200).json({
    id: readData[readData.length - 1].id + 1,
    name,
    age,
    talk,
  });
};

module.exports = registerTalker;
