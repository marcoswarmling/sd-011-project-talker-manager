const readFile = require('../services/readFile');

const getAllTalkers = async (req, res) => {
  const talkers = await readFile('talker.json');
  return res.status(200).json(talkers);
};

module.exports = {
  getAllTalkers,
};
