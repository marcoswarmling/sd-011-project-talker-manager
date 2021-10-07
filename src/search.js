const fs = require('fs');

const search = (req, res, _next) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const query = req.query.q;
  if (!query) return res.status(200).json(talkers);
  const filtered = talkers.filter((t) => t.name.includes(query));
  return res.status(200).json(filtered);
};

module.exports = search;
