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

const createToken = (req, res, next) => {
  req.newToken = (Math.random().toString(36).substr(2, 8)) * 2;
  next();
};

module.exports = {
  loadSpeakers,
  createToken,
};
