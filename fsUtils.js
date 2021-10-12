// const fs = require('fs').promises;

// function getTalkers() {
//   // lendo arquivo:
//   return fs.readFile('./talker.json', 'utf-8')
//   // 'traduzindo' para json
//   .then((talkerContent) => JSON.parse(talkerContent));
// }

// Função para escrever arquivos:
// const writeContentFile = async (path, content) => {
//   try {
//     // Lê arquivo usando a função getTalkers:
//     const arrContent = await getTalkers();
    
  // como trabalhamos com um array de obj, usa-se o push para adicionar coisineas:
  //   arrContent.push(content);
  //   await fs.writeFile(path, JSON.stringify(arrContent));

  //   return content;
  // } catch (error) {
  //   return null;
  // }

// module.exports = { getTalkers };
