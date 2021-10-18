const palestrantes = require('../connection/talkerConnection');
// const movieService = require('../services/movieServices');

const getAllTalks = async (req, res) => {
  const response = await palestrantes.getTalks();

  return res.status(200).json(response);
};

module.exports = { getAllTalks };
