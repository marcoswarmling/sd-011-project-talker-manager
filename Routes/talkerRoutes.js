const router = require('express').Router();
const fs = require('fs');
const {
  checkToken,
  nameValidate,
  ageValidate,
  talkValidate,
  rateValidate,
  formatDateValidate,
  dateRateValidate,
} = require('../middleware/validateTalker');

const talkersList = './talker.json';

router.get('/', (_req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync(talkersList));
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const talkers = JSON.parse(fs.readFileSync(talkersList));
    const talker = talkers.find((tk) => tk.id === Number(id));

    return talker
      ? res.status(200).json(talker)
      : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post('/',
checkToken,
nameValidate,
ageValidate,
talkValidate,
rateValidate,
formatDateValidate,
dateRateValidate,
(req, res) => {
  const { name, age, talk } = req.body;
  const fileContent = JSON.parse(fs.readFileSync(talkersList));
  const addId = fileContent[fileContent.length - 1].id + 1;
  const newTalker = { id: addId, name, age, talk };

  fileContent.push(newTalker);
  fs.writeFileSync(talkersList, JSON.stringify(fileContent));
  res.status(201).json(newTalker);
});

router.put('/:id',
checkToken,
nameValidate,
ageValidate,
talkValidate,
rateValidate,
formatDateValidate,
dateRateValidate,
(req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const fileContent = JSON.parse(fs.readFileSync(talkersList));
  const copyTalkers = fileContent.filter((t) => t.id !== Number(id));

  const updateTalker = { name, age, talk, id: Number(id) };
  const updateList = [...copyTalkers, updateTalker];
  fs.writeFileSync(talkersList, JSON.stringify(updateList));
  res.status(200).json(updateTalker);
});

router.delete('/:id', checkToken, (req, res) => {
  const { id } = req.params;
  const fileContent = JSON.parse(fs.readFileSync(talkersList));
  const filterTalkers = fileContent.filter((t) => t.id !== Number(id));

  fs.writeFileSync(talkersList, JSON.stringify(filterTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;