const { Router } = require('express');

const router = Router();

const fs = require('fs');

const validateTalker = require('../middlewares/validateTalker');

router.put('/:id', validateTalker, (req, res) => {
  const dados = fs.readFileSync('./talker.json');
  const parseDados = JSON.parse(dados);
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const i = parseDados.findIndex((t) => t.id === +id);

  parseDados[i] = { id: +id, name, age, talk };

  fs.writeFileSync('./talker.json', JSON.stringify(parseDados, null, 2));
  res.status(200).json(parseDados[i]);
});

module.exports = router;