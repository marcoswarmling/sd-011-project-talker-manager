const fs = require('fs');

const HTTP_OK_STATUS = 200;
const UNAUTHORIZED = 401;
const minimumTokenLength = 16;

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

const deleteTalker = (req, res) => {
  const rawData = fs.readFileSync(talkersData);
  const talkers = JSON.parse(rawData);
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  if (token.length !== minimumTokenLength) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  const deletedTalkerIndex = talkers.findIndex((talker) => talker.id === +id);
  talkers.splice(deletedTalkerIndex, 1);
  fs.writeFileSync(talkersData, JSON.stringify(talkers, null, 2));
  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = {
  getAllTalkers,
  getTalkersID,
  deleteTalker,
};
