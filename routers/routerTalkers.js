const router = require( express ).Router();

const { getTalkers } = require('../helpers/readFile');

router.get('/', async (_request, response) => {
  const talkers = await getTalkers('talker.json');
  if (!talkers) response.status(200).json([]);

  response.status(200).json(talkers);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const response = await fs.readFile('./talker.json', 'utf-8');
  const result = JSON.parse(response).find((talker) => Number(talker.id) === Number(id));
  if (!result) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(200).json(result);
});

module.exports = router;
