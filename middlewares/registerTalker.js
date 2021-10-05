const fs = require('fs').promises;

const readFile = async () => {
  const getDataFromFile = await fs.readFile('./talker.json', 'utf8');
  return getDataFromFile;
};

const registerTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const readData = JSON.parse(await readFile());
  const findBiggestId = readData.reduce((acc, curr) => Math.max(acc, curr.id), 0);
  readData.push({
    name,
    age,
    id: findBiggestId + 1,
    talk,
  });
  await fs.writeFile('./talker.json', JSON.stringify(readData));
  return res.status(201).json({
    id: findBiggestId + 1,
    name,
    age,
    talk,
  });
};

module.exports = registerTalker;
