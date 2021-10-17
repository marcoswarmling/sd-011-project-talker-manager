const { StatusCodes } = require('http-status-codes');
const readFile = require('../services/readFile');

const getAllTalkers = async (req, res) => {
  const talkers = await readFile('talker.json');
  return res.status(StatusCodes.OK).json(talkers);
};

module.exports = {
  getAllTalkers,
};
