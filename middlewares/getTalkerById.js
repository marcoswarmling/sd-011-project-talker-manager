const talker = require('../helper/talker');

const getTalkerById = (req, res) => {
  const rawTalker = talker();
  const { id } = req.params;
  const idFilter = rawTalker.find((person) => person.id === parseInt(id, 10));
  if (!idFilter) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(idFilter);
};

module.exports = getTalkerById;
