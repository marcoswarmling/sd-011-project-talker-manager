const fs = require('fs').promises;
const {
  validationToken,
  validationTalk,
  validationName,
  validationAge } = require('../../utils/validatePerson');

const attPerson = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    const { name, age, talk } = req.body;
    validationToken(token);
    validationAge(age);
    validationTalk(talk);
    validationName(name);
    const data = await fs.readFile('talker.json', 'utf8').then((f) => JSON.parse(f));
    const newData = data.map((e) => (e.id === +id ? { name, age, id: +id, talk } : e));
    await fs.writeFile('./talker.json', JSON.stringify(newData));
    return res.status(200).json({ name, age, id: +id, talk });
  } catch (err) {
    if (err.statusCode) {
      const { status, message } = err.statusCode;
      next({ status, message });
    } next({ status: 500, message: err });
  }
};

module.exports = attPerson;
