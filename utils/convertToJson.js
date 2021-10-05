const fs = require('fs');

// const talkObrigatoryField = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

// const addTalkerSchema = {
//   type: 'object',
//   properties: {
//     name: { type: 'string', minLength: 3 },
//     age: { type: 'integer', minimum: 18 },
//     talk: {
//       type: 'object',
//       properties: {
//         watchedAt: { type: 'string', pattern: '\\d{2}\\/\\d{2}\\/\\d{4}' },
//         rate: { type: 'integer', minimum: 1, maximum: 5 },
//       },
//       required: ['watchedAt'],
//       errorMessage: {
//         required: {
//           watchedAt: talkObrigatoryField,
//           rate: talkObrigatoryField,
//         },
//         properties: {
//           watchedAt: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
//           rate: 'O campo "rate" deve ser um inteiro de 1 à 5',
//         },
//       },
//     },
//   },
//   required: ['name', 'age', 'talk'],
//   additionalProperties: false,
//   errorMessage: {
//     properties: {
//       name: 'O "name" deve ter pelo menos 3 caracteres',
//       age: 'A pessoa palestrante deve ser maior de idade',
//       talk: talkObrigatoryField,
//     },
//     required: {
//       name: 'missing name',
//       age: 'missing age',
//       talk: talkObrigatoryField,
//     },
//   },
// };

function convertToJson(data, path) {
  fs.writeFileSync(path, JSON.stringify(data, null, '\t'));
}

module.exports = convertToJson;

// convertToJson(addTalkerSchema, 'schema.json');
