const fs = require('fs').promises;

const readFile = async () => {
  const getDataFromFile = await fs.readFile('./talker.json', 'utf8');
  return getDataFromFile;
};

const readFileMiddleware = async (req, res, _next) => {
  const readData = await readFile();
  if (!readData || readData.length === 0) {
    return res.status(200).send([]);
  }
  res.status(200).json(JSON.parse(readData));
};

module.exports = readFileMiddleware;