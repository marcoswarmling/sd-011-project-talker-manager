const fs = require('fs').promises;

const messages = 'Pessoa palestrante não encontrada';
const deleteT = 'Pessoa palestrante deletada com sucesso';
const HTTP_OK_STATUS = 200;
const path = './talker.json';

const searchTalk = async (req, res) => {
  const { q } = req.query;

  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);
  const response = result.filter((value) => value.name.includes(q));

  res.status(HTTP_OK_STATUS).json(response);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);
  const response = result.find((value) => value.id !== Number(id));
  await fs.writeFile(path, JSON.stringify(response));
  res.status(HTTP_OK_STATUS).send({ message: deleteT });
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
  res.status(200).send(talk);
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
  res.status(201).send(newTalker);
};

const getTalkerById = async (req, res) => {
  try {
    const { id } = req.params;

    const talker = await fs.readFile(path, 'utf8');
    const result = JSON.parse(talker);
    const response = result.find((value) => value.id === Number(id));

    if (!response) return res.status(404).json({ message: messages });

    res.status(HTTP_OK_STATUS).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAllTalkers = async (req, res) => {
  try {
    const response = await fs.readFile(path, 'utf8');
    if (!response) return res.status(HTTP_OK_STATUS).json([]);

    res.status(HTTP_OK_STATUS).json(JSON.parse(response));
  } catch (err) {
    res.status(400).json(err);
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