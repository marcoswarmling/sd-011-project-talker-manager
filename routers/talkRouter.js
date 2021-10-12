// // importa módulo router:
// const router = require('express').Router();
// const rescue = require('express-rescue');
// // Importando funções acessórias:
// const fsUtils = require('../fsUtils');
// // Importa middlewares de validação: 
// const {
//     tokenValidation,
//     nameValidation,
//     ageValidation,
//     talkValidation,
// } = require('../middlewares/addTalker');

// const {
//   //  getTalkers,
//     writeContentFile,
// } = require('../fsUtils');
// // Caminho do arquivo:
// const PATH_FILE = './.json';

// // Realizando a leitura do arquivo: ARRUMAR LEITURA E WRITE NO ARQUIVO FS.TÁ BEM ZOADO... 
// // ------ Requisito 4: criando rota /post/talker ----------------------------------------------------------------------------------

// // Cria rota /post (req: 4):
// router.post('/login', tokenValidation, nameValidation, ageValidation, talkValidation, 
//  async (req, res) => {
//     const newTalk = {
//         ...req.body,
//     };
//     const talk = await writeContentFile(PATH_FILE, newTalk);

//     res.status(200).json(talk);
// });

// // Requisito 2: --------------------------------------------------------------------

// router.get(
//     '/',
//     rescue(async (req, res) => {
//       const { id } = req.params;
//       const talker = await fsUtils.getTalkers();
//       // quando findIndex não encontra o elemento, ele retorna -1:
//       const talkerId = talker.findIndex((p) => p.id === Number(id));
      
//       if (talkerId === -1) {
//         return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
//       }
//     return res.status(200).json(talker[talkerId]);
//      }),
//   );
  
// module.exports = { router };