const { getTalkers } = require('./readTalker');

const IDVerification = (req, res) => {
  const { id } = req.parms;
  const talkers = getTalkers();
  const talkersIds = talkers.map((talker) => Number(talker.id));
  const talkerIncluded = talkersIds.includes(Number(id));
  if (!talkerIncluded) { 
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
};

module.exports = { IDVerification };