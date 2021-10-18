const fs = require('fs');

const HTTP_OK_STATUS = 200;

const talkersData = './talker.json';

const getAllTalkers = (_req, res) => {
  const data = fs.readFileSync(talkersData, 'utf-8');
  return res.status(HTTP_OK_STATUS).json(JSON.parse(data));
};

module.exports = {
  getAllTalkers,
};
