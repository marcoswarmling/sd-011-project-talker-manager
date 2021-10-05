const { readFile } = require('../helpers/handleJson');

const handleQuery = async (req, res) => {
  const { q } = req.query;
  const readJson = await readFile();
  const talker = readJson.filter((el) => el.name.includes(q));
  const response = !q ? readJson : talker;
  res.status(200).json(response);
};

module.exports = handleQuery;