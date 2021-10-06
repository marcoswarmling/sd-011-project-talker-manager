const fs = require('fs').promises;
const { status } = require('../status/index');

const messages = 'Pessoa palestrante não encontrada';
const deleteT = 'Pessoa palestrante deletada com sucesso';
const path = './talker.json';

const searchTalk = async (req, res) => {
  const { q } = req.query;

  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);
  const response = result.filter((value) => value.name.includes(q));

  res.status(status.status200).json(response);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);
  const response = result.find((value) => value.id !== Number(id));
  await fs.writeFile(path, JSON.stringify(response));
  res.status(status.status200).send({ message: deleteT });
};

const setEditTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { rate, watchedAt } } = req.body;
  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);
  const talk = {
    name,
    age,
    id: Number(id),
    talk: {
      rate,
      watchedAt,
    },
  };
  const talkIndex = result.findIndex((value) => value.id === Number(id));
  result[talkIndex] = talk;
  await fs.writeFile(path, JSON.stringify(result));
  res.status(status.status200).send(talk);
};

const setTalker = async (req, res) => {
  const { name, age, talk: { rate, watchedAt } } = req.body;

  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);

  const newTalker = {
    name,
    age,
    id: result.length + 1,
    talk: {
      rate,
      watchedAt,
    },
  };
  result.push(newTalker);
  await fs.writeFile(path, JSON.stringify(result));
  res.status(status.status201).send(newTalker);
};

const getTalkerById = async (req, res) => {
  try {
    const { id } = req.params;

    const talker = await fs.readFile(path, 'utf8');
    const result = JSON.parse(talker);
    const response = result.find((value) => value.id === Number(id));

    if (!response) return res.status(status.status404).json({ message: messages });

    res.status(status.status200).json(response);
  } catch (err) {
    res.status(status.status400).json(err);
  }
};

const getAllTalkers = async (req, res) => {
  try {
    const response = await fs.readFile(path, 'utf8');
    if (!response) return res.status(status.status200).json([]);

    res.status(status.status200).json(JSON.parse(response));
  } catch (err) {
    res.status(status.status400).json(err);
  }
};

module.exports = {
  searchTalk,
  deleteTalker,
  setEditTalker,
  setTalker,
  getTalkerById,
  getAllTalkers,
};