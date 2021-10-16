const router = require('express').Router();
const rescue = require('express-rescue');
// módulo para validação do token
const crypto = require('crypto');
const fs = require('fs').promises;

// Validações Requisito 3:
const { emailValido, senhaValida } = require('./middlewares/validation');

// Validações Requisito 4:
const ageValidation = require('./middlewares/ageValidation.js');
const nameValidation = require('./middlewares/nameValidation.js');
const watchedAtValidation = require('./middlewares/watchedAtValidation.js');
const tokenValidation = require('./middlewares/tokenValidation.js');
const rateValidation = require('./middlewares/rateValidation');
const talkValidation = require('./middlewares/talkValidation');

const talkersFile = 'talker.json';

// Requisito 7:
      router.get('/talker/search', tokenValidation, async (req, res) => {
        const { q } = req.query;
        const talker = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
        const searchResult = talker.filter((result) => result.name.includes(q));
        
        res.status(200).json(searchResult);
        });

// Requisito 1:
router.get('/talker', rescue(async (_request, response) => {
    const talker = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
    response.status(200).json(talker);
  }));
  
  // Requisito 2:
  router.get(
        '/talker/:id',
        rescue(async (req, res) => {
          const { id } = req.params;
          const talker = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
          // quando findIndex não encontra o elemento, ele retorna -1:
          const talkerId = talker.findIndex((p) => p.id === Number(id));
          
          if (talkerId === -1) {
            return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
          }
        return res.status(200).json(talker[talkerId]);
         }),
      );
  
  // Requisito 3:
  
  router.post('/login', emailValido, senhaValida, (req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
       res.status(200).json({ token });
        });
  
  // Requisito 4:
  
  router.post('/talker', tokenValidation, nameValidation, 
    ageValidation, talkValidation, watchedAtValidation, rateValidation,   
    async (req, res) => {
      const { name, age, talk } = req.body;
      const talker = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
      const newTalker = { name, age, talk, id: talker.length + 1 };
      talker.push(newTalker);
      res.status(201).json(newTalker);
      fs.writeFile(talkersFile, JSON.stringify(talker));
    });
  
    // Requisito 5:

router.put('/talker/:id', tokenValidation, nameValidation, 
ageValidation, talkValidation, watchedAtValidation, rateValidation, 
    async (req, res) => {
      const talker = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
    const { name, age, talk } = req.body;
   
    const mapping = talker.map((e) =>
    (Number(e.id) === Number(req.params.id) ? { id: e.id, name, age, talk } : e));

    const finding = mapping.find(({ id }) => Number(id) === Number(req.params.id));

    res.status(200).json(finding);
    fs.writeFile(talkersFile, JSON.stringify(mapping));
    });

module.exports = router;