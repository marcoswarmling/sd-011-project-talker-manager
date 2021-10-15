const fs = require('fs');

const putTalker = (req, res, _next) => {
  const idTalker = Number(req.params.id);
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const findTalker = talkers.find((talker) => talker.id === idTalker);
  findTalker.name = req.body.name;
  findTalker.age = req.body.age;
  findTalker.talk.watchedAt = req.body.talk.watchedAt;
  findTalker.talk.rate = Number(req.body.talk.rate);
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  res.status(200).json(findTalker);
};

module.exports = putTalker;