const models = require('../models');

const getTalkers = async (_, res) => {
  const talkers = await models.dataBase();

  if (!talkers) return res.status(200).json([]);

  return res.status(200).json(talkers);
};

const getTalker = async (req, res) => {
  const { id } = req.params;

  const talkers = await models.dataBase();

  const findTalker = talkers.find((talker) => talker.id === Number(id));

  if (!findTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(findTalker);
};

module.exports = { 
  getTalkers, 
  getTalker, 
};