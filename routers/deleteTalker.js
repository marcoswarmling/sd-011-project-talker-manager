const { Router } = require('express');

const router = Router();

const fs = require('fs');

router.delete('/:id', (req, res) => {
  const content = fs.readFileSync('./talker.json');
  const talkers = JSON.parse(content);
  const { authorization: token } = req.headers;
  const { id } = req.params;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  const talkerIndex = talkers.findIndex((t) => t.id === +id);

  talkers.splice(talkerIndex, 1);

  fs.writeFileSync('./talker.json', JSON.stringify(talkers, null, 2));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
