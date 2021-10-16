// const fs = require('fs').promises;

// const ageValidation = require('./ageValidation');
// const nameValidation = require('./nameValidation');
// const objValidation = require('./objValidation');
// const tokenValidation = require('./tokenValidation');

// const createTalker = async (req, res) => {
//   const newTalker = req.body;
//   const data = await fs.readFile('./talker.json', 'utf-8')
//   .then((file) => JSON.parse(file));
  
//   if (
//     ageValidation(req, res)
//     && nameValidation(req, res)
//     && objValidation(req, res)
//     && tokenValidation(req, res)
//   ) {
//     newTalker.id = data.length + 1;
//     data.push(newTalker);
//     await fs.writeFile('./talker.json', JSON.stringify(data));

//     return res.status(201).json(newTalker);
//   }
// };
// module.exports = (createTalker);