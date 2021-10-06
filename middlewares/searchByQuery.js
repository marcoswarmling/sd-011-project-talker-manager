const fs = require('fs').promises;

const readFile = async () => {
  const getDataFromFile = await fs.readFile('./talker.json', 'utf8');
  return getDataFromFile;
};

const findByQueryTalker = async (req, res, _next) => {
  const { q } = req.query;
  console.log(q);

  const data = JSON.parse(await readFile());
  const filteredData = data.filter((i) => i.name.includes(q));

  if (!q) {
    return res.status(200).json(data);
  }
  if (filteredData.length === 0) {
    return res.status(200).json([]);
  }

  res.status(200).json(filteredData);
};

module.exports = findByQueryTalker;
