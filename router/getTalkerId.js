const { Router } = require('express');
const fs = require('fs');
const util = require('util');

const router = Router();

const readFilePromise = util.promisify(fs.readFile);

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const content = await readFilePromise('talker.json');
  const talkerJson = JSON.parse(content);
  const idTalker = talkerJson.find((talker) => talker.id === +id);
  if (!idTalker) {
    return response.status(HTTP_NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    }); 
  }
  return response.status(HTTP_OK_STATUS).json(idTalker);
});

module.exports = router;