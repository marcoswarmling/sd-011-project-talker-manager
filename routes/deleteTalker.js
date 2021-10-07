const { Router } = require('express');

const router = Router();

const fs = require('fs');

router.delete('/:id', (req, res) => {
  const dados = fs.readFileSync('./talker.json');
  const { authorization: token } = req.headers;
  const { id } = req.params;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  const i = JSON.parse(dados).findIndex((t) => t.id === +id);

  JSON.parse(dados).splice(i, 1);

  fs.writeFileSync('./talker.json', JSON.stringify(JSON.parse(dados), null, 2));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;