const { Router } = require('express');
const fs = require('fs');
const util = require('util');

const router = Router();

const validation = require('./validation');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const Validations = [
  validation.tokenExists,
  validation.validateToken,
];

router.delete('/:id', Validations, async (request, response) => {
  const { id } = request.params;
  const content = await readFilePromise('talker.json');
  const talkerJson = JSON.parse(content);
  const target = talkerJson.filter((talker) => talker.id !== +id);
  await writeFilePromise('talker.json', JSON.stringify(target));
  return response.status(200).json({
    message: 'Pessoa palestrante deletada com sucesso', 
  });
});

module.exports = router;