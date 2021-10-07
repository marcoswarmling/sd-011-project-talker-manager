const { Router } = require('express');

const router = Router();

const fs = require('fs');

router.get('/search', (req, res) => {
  const content = fs.readFileSync('./talker.json');
  const talkers = JSON.parse(content);
  const { authorization: token } = req.headers;
  const { param } = req.query;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  if (param) {
    const filteredTalkers = talkers.filter((t) => t.name.includes(param));
    return res.status(200).json(filteredTalkers);
  }
  return res.status(200).json(talkers);
});

module.exports = router;
