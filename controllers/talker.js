const { StatusCodes } = require('http-status-codes');
const readFile = require('../services/readFile');

const getAllTalkers = async (req, res) => {
  const talkers = await readFile('talker.json');
  return res.status(StatusCodes.OK).json(talkers);
};

const getIdTalkers = async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile('talker.json');

  const talkerId = talkersList.find((talker) => talker.id === parseInt(id, 10));

  if (!talkerId) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(StatusCodes.OK).json(talkerId);
};

module.exports = {
  getAllTalkers,
  getIdTalkers,
};
