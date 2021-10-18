const fs = require('fs');

const HTTP_OK_STATUS = 200;

const talkersData = './talker.json';

const getAllTalkers = (_req, res) => {
  const data = fs.readFileSync(talkersData, 'utf-8');
  return res.status(HTTP_OK_STATUS).json(JSON.parse(data));
};

const getTalkersID = (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(talkersData, 'utf-8');
  const talker = JSON.parse(data).find((talkerId) => talkerId.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(HTTP_OK_STATUS).json(talker);
};

module.exports = {
  getAllTalkers,
  getTalkersID,
};
