const { readFile, writeFiles } = require('./readfile');

const TALKER = './talker.json';

const getAll = async (_req, res) => {
  const result = await readFile(TALKER);
  if (!result) return res.status(200).json([]);
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const result = await readFile(TALKER);
  const { id } = req.params;
  const talkerFind = result.find((t) => t.id === +(id));
  if (!talkerFind) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talkerFind);
};

const create = async (req, res) => {
  const { name, age, talk } = req.body;
  const result = await readFile(TALKER);
  const id = result.length + 1;
  result.push({
    id,
    name,
    age,
    talk,
  });
  await writeFiles(TALKER, result);
  return res.status(201).json({ id, name, age, talk });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const result = await readFile(TALKER);
  const filterIndex = result.findIndex((r) => r.id === Number(id));
  const editTalker = { id: Number(id), name, age, talk };
  result.splice(filterIndex, 1, editTalker);
  await writeFiles(TALKER, result);
  res.status(200).json(editTalker);
};

const deleta = async (req, res) => {
  const { id } = req.params;
  const result = await readFile(TALKER);
  const deleteTalker = result.filter((r) => r.id !== Number(id));
  await writeFiles(TALKER, deleteTalker);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

const search = async (req, res) => {
  const { q } = req.query;
  const result = await readFile(TALKER);
  if (!q) return res.status(200).json(result);
  const filterResult = result.filter((r) => r.name.includes(q));
  if (!filterResult) return res.status(200).json([]);
  return res.status(200).json(filterResult);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleta,
  search,
};