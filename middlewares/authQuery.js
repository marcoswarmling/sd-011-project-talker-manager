const { readFile } = require('../data/accessFile');

const authQuery = async (req, res, next) => {
  const data = await readFile();
  const { q } = req.query;
  if (!q || q === '') return res.status(200).json(data);

  next();
};

module.exports = authQuery;
