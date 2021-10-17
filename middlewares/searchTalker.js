const fs = require('fs');

const searchTalker = (req, res, _next) => {
  const { q } = req.query;
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  if (!q) return res.status(200).json(talkers);
  const filterTalk = talkers.filter((talker) => talker.name.includes(q));
  if (filterTalk) {
    return res.status(200).json(filterTalk);
  }
  return res.status(200).json(Array.from([]));
};

module.exports = searchTalker;
