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

const insertTalker = async (req, res) => {
  const { name, age, talk } = req.body;

  const dataBaseTalker = await models.dataBase();
  
  const formatTalker = {
    id: dataBaseTalker.length + 1,
    name,
    age,
    talk,
  };

  const newTalker = [...dataBaseTalker, formatTalker];

  models.addTalker(newTalker);

  return res.status(201).json(formatTalker);
};

const updateTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const dataBaseTalker = await models.dataBase();
  const formatTalker = { id: Number(id), name, age, talk };
  
  const findTalker = dataBaseTalker.map((talker) => (
    talker.id === Number(id) ? formatTalker : id
  ));

  models.addTalker(findTalker);

  return res.status(200).json(formatTalker);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;

  const dataBaseTalker = await models.dataBase();

  const differentTalkers = dataBaseTalker.find((talker) => talker.id !== Number(id));

  models.addTalker(differentTalkers);

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = { 
  getTalkers, 
  getTalker,
  insertTalker,
  updateTalker,
  deleteTalker,
};