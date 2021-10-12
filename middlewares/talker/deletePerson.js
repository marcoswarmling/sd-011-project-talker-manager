const fs = require('fs').promises;

const { validationToken } = require('../../utils/validatePerson');

const deletePerson = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    validationToken(token);
    const data = await fs.readFile('talker.json', 'utf8').then((f) => JSON.parse(f));
    const newDocument = data.filter((e) => e.id !== Number(id));
    await fs.writeFile('./talker.json', JSON.stringify(newDocument));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    if (err.statusCode) {
      const { status, message } = err.statusCode;
      next({ status, message });
    }
    next({ status: 500, message: err });
  }
};

module.exports = deletePerson;
