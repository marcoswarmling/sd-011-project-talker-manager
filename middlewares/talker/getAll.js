const fs = require('fs').promises;

const getAll = async (_req, res, next) => {
  try {
    const data = await fs.readFile('talker.json', 'utf8').then((A) => JSON.parse(A));
    return res.status(200).json(data);
  } catch (err) {
    next({ status: 400, message: 'Erro' });
  }
};

module.exports = getAll;
