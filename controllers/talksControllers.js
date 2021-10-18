const palestrantes = require('../connection/talkerConnection');
// const movieService = require('../services/movieServices');

const getAllTalks = async (req, res) => {
  try {
    const response = await palestrantes.getTalks();

    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
};

const getIdTalks = async (req, res) => {
  try {
    const response = await palestrantes.getIdTalks(req.params.id);
  if (!response) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(response);
  return res.status(200).json(response);
  } catch (error) {
    return error;
  }
};

const getLoginTalks = async (req, res) => {
  try {
    const response = await palestrantes.getLoginTalks();

    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
};

module.exports = { getAllTalks, getIdTalks, getLoginTalks };
