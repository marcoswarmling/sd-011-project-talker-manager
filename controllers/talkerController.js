const fs = require('fs');

const readTalkers = () => {
  let result = [];
  try {
    const data = fs.readFileSync('talker.json', 'utf8');
    result = JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
  return result;
};

const getAllTalkers = (_req, res) => {
  res.status(200).json(readTalkers());
};

module.exports = {
  getAllTalkers,
};
