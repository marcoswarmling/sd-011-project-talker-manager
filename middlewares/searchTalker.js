const getTalker = require('../helper/talker');

const searchTalker = (req, res) => {
  const talkers = getTalker();
  const { q } = req.query;
  if (q) {
    const filteredNames = talkers.filter(({ name }) => name.includes(q));
    return res.status(200).json(filteredNames);
  }
  return res.status(200).json({ talkers });
};

module.exports = searchTalker;
