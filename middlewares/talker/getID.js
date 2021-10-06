const fs = require('fs').promises;

const getID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile('talker.json', 'utf8').then((A) => JSON.parse(A));
    const user = data.find((e) => e.id === Number(id));
    if (!user) {
      next({ status: 404, message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(user);
  } catch (err) {
    next({ status: 400, message: 'Erro' });
  }
};

module.exports = getID;
