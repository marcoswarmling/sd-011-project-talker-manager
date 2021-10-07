const { Router } = require('express');

const router = Router();

const fs = require('fs');

router.delete('/:id', (req, res) => {
  const dados = fs.readFileSync('./talker.json');
  const parseDados = JSON.parse(dados);
  const { authorization: token } = req.headers;
  const { id } = req.params;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  const i = parseDados.findIndex((t) => t.id === +id);

  parseDados.splice(i, 1);

  fs.writeFileSync('./talker.json', JSON.stringify(parseDados, null, 2));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;