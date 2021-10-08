const fs = require('fs');

const addTalker = (req, res, _next) => {
  const talker = JSON.parse(fs.readFileSync('talker.json'));
  const newTalker = {
    id: talker.length + 1,
    name: req.body.name,
    age: req.body.age,
    talk: {
      watchedAt: req.body.talk.watchedAt,
      rate: +req.body.talk.rate,
    },
  };
  talker.push(newTalker);
  fs.writeFileSync('talker.json', JSON.stringify(talker));
  res.status(201).json(newTalker);
};

module.exports = addTalker;
