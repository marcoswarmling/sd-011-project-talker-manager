const fs = require('fs').promises;

const setPerson = require('../addnewperson/setPerson');

const { validationToken, 
  validationTalk, 
  validationName, 
  validationAge } = require('../../utils/validatePerson');

const addNewPerson = async (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    const token = req.headers.authorization;
    validationToken(token);
    validationTalk(talk);
    validationName(name);
    validationAge(age);
    const data = await fs.readFile('talker.json', 'utf8').then((f) => JSON.parse(f));
    const newPerson = { name, age, id: data.length + 1, talk };
    setPerson(data, newPerson);
    return res.status(201).json(newPerson);
  } catch (err) {
    if (err.statusCode) {
      const { status, message } = err.statusCode;
      next({ status, message });
    }
    next({ status: 500, message: err });
  }
};

module.exports = addNewPerson;
