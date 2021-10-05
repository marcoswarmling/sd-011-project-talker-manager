const fs = require('fs').promises;

module.exports = (app) => {
  const HTTP_OK_STATUS = 200;

  app.get('/talker', async (req, res) => {
    try {
      const resposta = await fs.readFile('./talker.json', 'utf8');
      if (!resposta) return res.status(HTTP_OK_STATUS).json([]);
  
      res.status(HTTP_OK_STATUS).json(JSON.parse(resposta));
    } catch (error) {
      res.status(400).json(error);
    }
  });
};
