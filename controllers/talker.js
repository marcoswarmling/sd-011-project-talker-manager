const models = require('../models');

const getTalkers = async (_, res) => {
  const talkers = await models.dataBase();

  if (!talkers) return res.status(200).json([]);

  return res.status(200).json(talkers);
};

module.exports = { getTalkers };