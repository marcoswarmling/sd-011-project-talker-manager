const fs = require('fs');

const loadSpeakers = (req, res, next) => {
  let speakers = [];
  try {
    const data = fs.readFileSync('talker.json', 'utf8');
    speakers = JSON.parse(data);
  } catch (err) {
    res.status(200).json([]);
  }
  req.speakers = speakers;
  next();
};

module.exports = {
  loadSpeakers,
};
